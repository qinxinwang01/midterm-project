import './App.css'

const featuredRestaurants = [
  {
    id: 1,
    name: "The Spice Garden",
    cuisine: "Indian",
    rating: 4.8,
    deliveryTime: "25-35 min",
    priceRange: "$$",
    tag: "Popular",
  },
  {
    id: 2,
    name: "Sakura Sushi",
    cuisine: "Japanese",
    rating: 4.6,
    deliveryTime: "20-30 min",
    priceRange: "$$$",
    tag: "New",
  },
  {
    id: 3,
    name: "Bella Italia",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "30-40 min",
    priceRange: "$$",
    tag: "Top Rated",
  },
]

const featuredDishes = [
  { id: 1, name: "Butter Chicken", restaurant: "The Spice Garden", price: "$14.99", category: "Main" },
  { id: 2, name: "Salmon Sashimi", restaurant: "Sakura Sushi", price: "$18.99", category: "Appetizer" },
  { id: 3, name: "Margherita Pizza", restaurant: "Bella Italia", price: "$13.99", category: "Main" },
  { id: 4, name: "Mango Lassi", restaurant: "The Spice Garden", price: "$4.99", category: "Drink" },
  { id: 5, name: "Tiramisu", restaurant: "Bella Italia", price: "$7.99", category: "Dessert" },
  { id: 6, name: "Dragon Roll", restaurant: "Sakura Sushi", price: "$15.99", category: "Main" },
]

const features = [
  {
    icon: "search",
    title: "Discover Menus",
    description: "Browse full menus from hundreds of local restaurants before you order.",
  },
  {
    icon: "filter",
    title: "Filter by Taste",
    description: "Find exactly what you're craving — filter by cuisine, price, dietary needs, and more.",
  },
  {
    icon: "star",
    title: "Ratings & Reviews",
    description: "Real reviews from real diners help you choose with confidence every time.",
  },
]

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

const iconMap = { search: SearchIcon, filter: FilterIcon, star: StarIcon }

function FeatureCard({ icon, title, description }) {
  const Icon = iconMap[icon]
  return (
    <div className="feature-card">
      <div className="feature-icon"><Icon /></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function RestaurantCard({ name, cuisine, rating, deliveryTime, priceRange, tag }) {
  return (
    <div className="restaurant-card">
      {tag && <span className="restaurant-tag">{tag}</span>}
      <div className="restaurant-avatar">{name[0]}</div>
      <h3>{name}</h3>
      <p className="cuisine">{cuisine} · {priceRange}</p>
      <div className="restaurant-meta">
        <span className="rating">&#9733; {rating}</span>
        <span className="delivery-time">{deliveryTime}</span>
      </div>
    </div>
  )
}

function DishCard({ name, restaurant, price, category }) {
  return (
    <div className="dish-card">
      <div className="dish-category">{category}</div>
      <h4>{name}</h4>
      <div className="dish-footer">
        <span className="dish-restaurant">{restaurant}</span>
        <span className="dish-price">{price}</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-icon">QB</span>
          <span className="logo-text">QuickBite</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#restaurants">Restaurants</a>
          <a href="#dishes">Dishes</a>
        </div>
        <button className="nav-cta">Get Started</button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Restaurant Menu Discovery</span>
          <h1>Find Your Next <span className="highlight">Favorite Dish</span></h1>
          <p className="hero-subtitle">
            Browse full menus, discover new restaurants, and explore cuisines from around the world — all in one place.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Explore Menus</button>
            <button className="btn-secondary">Browse Restaurants</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <strong>500+</strong>
              <span>Restaurants</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>10k+</strong>
              <span>Menu Items</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>4.9</strong>
              <span>Avg Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" id="features">
        <div className="section-header">
          <h2>Why QuickBite?</h2>
          <p>Everything you need to make smarter dining decisions.</p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <FeatureCard key={f.icon} {...f} />
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="section section-alt" id="restaurants">
        <div className="section-header">
          <h2>Featured Restaurants</h2>
          <p>Handpicked places loved by our community.</p>
        </div>
        <div className="restaurants-grid">
          {featuredRestaurants.map((r) => (
            <RestaurantCard key={r.id} {...r} />
          ))}
        </div>
      </section>

      {/* Trending Dishes */}
      <section className="section" id="dishes">
        <div className="section-header">
          <h2>Trending Dishes</h2>
          <p>What everyone is ordering right now.</p>
        </div>
        <div className="dishes-grid">
          {featuredDishes.map((d) => (
            <DishCard key={d.id} {...d} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>Ready to explore?</h2>
        <p>Join thousands of food lovers discovering their next favorite meal.</p>
        <button className="btn-primary btn-large">Start Browsing — It&apos;s Free</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <span className="logo-icon">QB</span>
          <span className="logo-text">QuickBite</span>
        </div>
        <p className="footer-tagline">Discover menus. Explore flavors. Eat well.</p>
        <p className="footer-copy">&copy; {new Date().getFullYear()} QuickBite. All rights reserved.</p>
      </footer>
    </div>
  )
}
