function SearchBar({
  search,
  setSearch,
  sortBy,
  setSortBy,
}) {
  return (
    <section className="search-sort">
      <input
        type="text"
        placeholder="Search expenses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search Expenses"
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        aria-label="Sort Expenses"
      >
        <option value="newest">
          Newest First
        </option>

        <option value="oldest">
          Oldest First
        </option>

        <option value="highest">
          Highest Amount
        </option>

        <option value="lowest">
          Lowest Amount
        </option>
      </select>
    </section>
  );
}

export default SearchBar;