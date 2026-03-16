import MenuCard from './MenuCard'

export default function MenuGrid({ items, favorites, onToggleFavorite }) {
  return (
    <div className="menu-grid">
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          isFavorite={favorites.includes(item.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
