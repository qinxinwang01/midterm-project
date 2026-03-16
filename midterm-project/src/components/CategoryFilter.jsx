export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-btn ${activeCategory === category ? 'filter-btn-active' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
