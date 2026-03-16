export default function SearchBar({ searchQuery, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search dishes..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
    </div>
  )
}
