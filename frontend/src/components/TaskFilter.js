function TaskFilter({activeFilter,onFilterChange,searchQuery,onSearchChange,sortOption,onSortChange,}) {
    const filters = [
      { value: "all", label: "All" },
      { value: "completed", label: "Completed" },
      { value: "pending", label: "Pending" },
    ];
  
    return (
      <section
        className="task-filter"
        aria-label="Task controls"
      >
        <h2>Find Tasks</h2>
  
        <div className="task-filter_tools">
          <label>
            Search
            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search tasks..."
            />
          </label>
  
          <label>
            Sort
            <select
              value={sortOption}
              onChange={(event) =>
                onSortChange(event.target.value)
              }
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="priority-high">
                Priority: high first
              </option>
              <option value="priority-low">
                Priority: low first
              </option>
            </select>
          </label>
        </div>
  
        <div className="task-filter_buttons">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => onFilterChange(filter.value)}
              aria-pressed={activeFilter === filter.value}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>
    );
  }
  
  export default TaskFilter;