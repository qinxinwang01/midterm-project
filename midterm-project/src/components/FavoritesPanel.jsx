import { menuItems } from '../data/menuData'

export default function FavoritesPanel({ favorites, user, onToggleFavorite }) {
  const favoriteDishes = menuItems.filter((item) => favorites.includes(item.id))

  if (!user) {
    return (
      <div className="favorites-panel">
        <h2 className="favorites-title">My Favorites</h2>
        <p className="favorites-empty">Log in to save your favorite dishes!</p>
      </div>
    )
  }

  if (favoriteDishes.length === 0) {
    return (
      <div className="favorites-panel">
        <h2 className="favorites-title">My Favorites</h2>
        <p className="favorites-empty">No favorites yet. Click ♥ on a dish to save it!</p>
      </div>
    )
  }

  return (
    <div className="favorites-panel">
      <h2 className="favorites-title">My Favorites ({favoriteDishes.length})</h2>
      <ul className="favorites-list">
        {favoriteDishes.map((item) => (
          <li key={item.id} className="favorites-item">
            <img src={item.image} alt={item.name} className="favorites-item-img" />
            <div className="favorites-item-info">
              <span className="favorites-item-name">{item.name}</span>
              <span className="favorites-item-price">${item.price.toFixed(2)}</span>
            </div>
            <button
              className="favorites-remove-btn"
              onClick={() => onToggleFavorite(item.id)}
              aria-label="Remove from favorites"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
