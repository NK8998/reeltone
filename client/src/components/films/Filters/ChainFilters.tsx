import { LinkIcon } from "@/assets/icons";
import { useFilterContext } from "@/context/FilterContext";
import { toast } from "sonner";

export default function ChainFilters() {
  const { chainFilters, setChainFilters } = useFilterContext();

  const handleClick = () => {
    setChainFilters(!chainFilters);
    toast.info(`Filters will ${chainFilters ? "not" : ""} be combined`, {
      position: "top-center",
    });
  };

  return (
    <div
      className={`chain-filters ${chainFilters ? "active" : ""}`}
      onClick={handleClick}
    >
      <span className='text:sm view-selector-text'>Combine Filters</span>
      <LinkIcon />
    </div>
  );
}
