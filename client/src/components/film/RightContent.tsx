import { EssentialData, UserFlags } from "@/types/types";
import FilmRight from "./FilmRight";

interface RightContentProps {
  essentialData: EssentialData;
  userFlags: UserFlags;
}

export default function RightContent({
  essentialData,
  userFlags,
}: RightContentProps) {
  return (
    <section className='film-middle-content'>
      <FilmRight essentialData={essentialData} userFlags={userFlags} />
    </section>
  );
}
