import { LinkIcon } from "@/assets/icons";
import { useFilterContext } from "@/context/FilterContext";

export default function ChainFilters() {
  const { chainFilters, setChainFilters } = useFilterContext();
  return (
    <div
      className={`chain-filters ${chainFilters ? "active" : ""}`}
      onClick={() => setChainFilters(!chainFilters)}
    >
      <span className='text:sm view-selector-text'>Combine Filters</span>
      <LinkIcon />
    </div>
  );
}
