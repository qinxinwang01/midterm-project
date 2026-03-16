import { useState, useEffect } from 'react'
import './App.css'
import { menuItems } from './data/menuData'
import { supabase } from './supabaseClient'
import MenuGrid from './components/MenuGrid'
import CategoryFilter from './components/CategoryFilter'
import SearchBar from './components/SearchBar'
import FavoritesPanel from './components/FavoritesPanel'
import AuthModal from './components/AuthModal'

const categories = ['All', ...new Set(menuItems.map((item) => item.category))]

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState([])
  const [user, setUser] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  // On app load: check if user is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) loadFavorites(session.user.id)
    })

    // Listen for login / logout changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadFavorites(session.user.id)
      } else {
        setFavorites([]) // clear favorites on logout
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Load this user's favorites from Supabase
  async function loadFavorites(userId) {
    const { data, error } = await supabase
      .from('favorites')
      .select('menu_item_id')
      .eq('user_id', userId)

    if (!error) {
      setFavorites(data.map((row) => row.menu_item_id))
    }
  }

  // Add or remove a favorite in Supabase
  async function toggleFavorite(id) {
    if (!user) {
      setShowAuthModal(true) // prompt login if not logged in
      return
    }

    const isFavorited = favorites.includes(id)

    if (isFavorited) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('menu_item_id', id)
      setFavorites((prev) => prev.filter((favId) => favId !== id))
    } else {
      await supabase
        .from('favorites')
        .insert({ user_id: user.id, menu_item_id: id })
      setFavorites((prev) => [...prev, id])
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-icon">QB</span>
          <span className="logo-text">QuickBite</span>
        </div>

        <div className="nav-auth">
          {user ? (
            <>
              <span className="nav-user-email">{user.email}</span>
              <button className="nav-logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <button className="nav-cta" onClick={() => setShowAuthModal(true)}>
              Log In / Sign Up
            </button>
          )}
        </div>
      </nav>

      {/* Menu Section */}
      <main className="section">
        <div className="section-header">
          <h2>Browse the Menu</h2>
          <p>{filteredItems.length} dishes available</p>
        </div>

        <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <MenuGrid
          items={filteredItems}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      <FavoritesPanel favorites={favorites} user={user} onToggleFavorite={toggleFavorite} />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <span className="logo-icon">QB</span>
          <span className="logo-text">QuickBite</span>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} QuickBite. All rights reserved.</p>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  )
}
