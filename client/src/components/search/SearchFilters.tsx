import { useFilterContext } from "@/context/FilterContext";

const FILTERS = [
  { key: "popularity", label: "Popularity" },
  { key: "release_date", label: "Release Date" },
  { key: "vote_average", label: "Rating" },
];

export default function SearchFilters() {
  const { searchFilter, setSearchFilter, sortDirection, setSortDirection } =
    useFilterContext();

  return (
    <section className='w-full bg-[#EBEBE4] px-4 py-3 rounded-lg shadow-sm mb-4'>
      <div className='flex items-center justify-between'>
        {/* Left Side Title */}
        <h2 className='text-lg font-semibold text-[#336062]'>Search Filters</h2>

        {/* Right Side Filters */}
        <div className='flex items-center gap-3'>
          {/* Filter Buttons */}
          <div className='flex gap-2'>
            {FILTERS.map((f) => {
              const active = searchFilter === f.key;

              return (
                <button
                  key={f.key}
                  onClick={() => setSearchFilter(f.key)}
                  className={`
                    px-3 py-1 rounded-md text-sm font-medium
                    transition-colors border
                    ${
                      active
                        ? "bg-[#336062] text-white border-[#336062]"
                        : "bg-[#77847C] text-white border-[#747C7C] hover:bg-[#747C7C]"
                    }
                  `}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Gap */}
          <div className='w-6'></div>

          {/* Asc/Desc Toggle */}
          <button
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className={`
              px-3 py-1 rounded-md text-sm font-medium border
              bg-[#336062] text-white border-[#336062]
              hover:bg-[#27494a] transition-colors
            `}
          >
            {sortDirection === "asc" ? "ASC ↑" : "DESC ↓"}
          </button>
        </div>
      </div>
    </section>
  );
}
