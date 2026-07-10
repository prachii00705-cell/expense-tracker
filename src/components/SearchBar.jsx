function SearchBar({
  search,
  setSearch,
  sortBy,
  setSortBy,
  categoryFilter,
  setCategoryFilter,
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
        value={categoryFilter}
        onChange={(e) =>
          setCategoryFilter(e.target.value)
        }
        aria-label="Filter Expenses"
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Health">Health</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value)
        }
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