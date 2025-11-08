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
    <section className='w-full px-4 rounded-lg shadow-sm mb-4 flex flex-col max-w-[200px]'>
      <h4 className='w-[100%] mb-1 text-[14px]'>FILTER OPTIONS</h4>
      <div className='w-[100%] bg-[#f0f0f03a] h-[1px] mb-5'></div>
      <div className='flex flex-col gap-2'>
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
    </section>
  );
}
