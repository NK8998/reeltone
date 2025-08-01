import { Film } from "@/types/types";
import FilmCard from "../reusables/FilmCard";

interface RecentFilmsProps {
    recent_films: Film[];
}

export default function RecentFilms({ recent_films }: RecentFilmsProps) {
    const recentFilmsElements = recent_films.map((film) => (
        <FilmCard key={film.id} film={film} hasOverlay />
    ));

    return (
        <section className="py-6 px-4 sm:px-6 lg:px-8 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-300">Recent Films</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-y-8 gap-x-3">
                {recentFilmsElements}
            </div>
        </section>
    );
}
