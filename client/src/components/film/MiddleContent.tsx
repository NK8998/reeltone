import { EssentialData } from "@/types/types";
import FilmMiddle from "./FilmMiddle";

export default function MiddleContent({
  essentialData,
}: {
  essentialData: EssentialData;
}) {
  return (
    <section className='film-middle-content'>
      <FilmMiddle essentialData={essentialData} />
    </section>
  );
}
