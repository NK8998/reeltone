import { EssentialData } from "@/types/types";
import { useState } from "react";
import TabSelectors from "./TabSelectors";
import Tabs from "./Tabs";

export default function FilmMiddle({
  essentialData,
}: {
  essentialData: EssentialData;
}) {
  const [currentTab, setCurrentTab] = useState<string>("cast");
  const year = new Date(essentialData.release_date).getFullYear();
  const director =
    essentialData.crew.find((member) => member.job === "Director")?.name ||
    "Unknown";

  return (
    <div className='film-middle'>
      <div className='film-cotent-top'>
        <h2>{essentialData.title}</h2>
        <span className='film-year'>{year}</span>
        <span> Directed by </span>
        <span className='film-director'>{director}</span>
      </div>
      <div className='film-content-section overview'>
        <p className='film-overview'>{essentialData.overview}</p>
      </div>
      <TabSelectors currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Tabs essentialData={essentialData} currentTab={currentTab} />
      <h3 className='film-run-time'>{essentialData.runtime} minutes</h3>
    </div>
  );
}
