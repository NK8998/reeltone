import FilmCard from "@/components/reusables/FilmCard";
import { Film } from "@/types/types";
import Link from "next/link";

export default function FilmsContainer({
  films,
  compactView,
}: {
  films: Film[];
  compactView: boolean;
}) {
  return (
    <section className={`films-container ${compactView ? "compact" : ""}`}>
      {films.map((film, index) => (
        <FilmCard
          key={`$${film.id}-${index}`}
          film={film}
          prefetch={index === 0}
        />
      ))}
    </section>
  );
}
