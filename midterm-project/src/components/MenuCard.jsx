export default function MenuCard({ item, isFavorite, onToggleFavorite }) {
  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} className="menu-card-img" />
      <div className="menu-card-body">
        <span className="menu-card-category">{item.category}</span>
        <h3 className="menu-card-name">{item.name}</h3>
        <p className="menu-card-description">{item.description}</p>
        <div className="menu-card-footer">
          <p className="menu-card-price">${item.price.toFixed(2)}</p>
          <button
            className={`favorite-btn ${isFavorite ? 'favorite-btn-active' : ''}`}
            onClick={() => onToggleFavorite(item.id)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  )
}
