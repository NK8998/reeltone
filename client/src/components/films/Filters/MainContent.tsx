import "../style.css";
import "./style.css";
import FilmsContainer from "./FilmsContainer";
import { Film } from "@/types/types";
import MainSectionLoader from "@/components/reusables/MainSectionLoader";
import { useState } from "react";
import FilterBar from "./FilterBar";
import SingleYear from "./SingleYear";

export default function MainContent({
  films,
  loading,
}: {
  films: Film[];
  loading: boolean;
}) {
  const [compactView, setCompactView] = useState(false);
  return (
    <>
      <FilterBar compactView={compactView} setCompactView={setCompactView} />
      <SingleYear />
      {loading && <MainSectionLoader />}
      {!loading && <FilmsContainer films={films} compactView={compactView} />}
    </>
  );
}
