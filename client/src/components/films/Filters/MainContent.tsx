import "../style.css";
import "./style.css";
import FilmsContainer from "./FilmsContainer";
import { Film } from "@/types/types";
import MainSectionLoader from "@/components/reusables/MainSectionLoader";
import { useState } from "react";
import FilterBar, { ChangeView } from "./FilterBar";
import SingleYear from "./SingleYear";
import ChainFilters from "./ChainFilters";

export default function MainContent({
  films,
  loading,
}: {
  films: Film[];
  loading: boolean;
}) {
  const [compactView, setCompactView] = useState(true);
  return (
    <>
      <FilterBar compactView={compactView} setCompactView={setCompactView} />
      <div className='mini-change-view'>
        <ChainFilters />
        <ChangeView compactView={compactView} setCompactView={setCompactView} />
      </div>
      <SingleYear />
      {loading && <MainSectionLoader />}
      {!loading && <FilmsContainer films={films} compactView={compactView} />}
    </>
  );
}
