import { useState } from 'react'
import './App.css'
import { menuItems } from './data/menuData'
import MenuGrid from './components/MenuGrid'
import CategoryFilter from './components/CategoryFilter'
import SearchBar from './components/SearchBar'
import FavoritesPanel from './components/FavoritesPanel'

const categories = ['All', ...new Set(menuItems.map((item) => item.category))]

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem('favorites')) || []
  )

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
      localStorage.setItem('favorites', JSON.stringify(updated))
      return updated
    })
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

      <FavoritesPanel favorites={favorites} onToggleFavorite={toggleFavorite} />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <span className="logo-icon">QB</span>
          <span className="logo-text">QuickBite</span>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} QuickBite. All rights reserved.</p>
      </footer>
    </div>
  )
}
