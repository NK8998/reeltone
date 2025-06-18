import { Film } from "@/types/types";

interface RecentFilmsProps {
  recent_films: Film[];
}

export function RecentFilms({ recent_films }: RecentFilmsProps) {
  return (
    <section className='recent-films'>
      <h2>Recent Films</h2>
      <div className='film-grid'>
        {recent_films.map((film, idx) => (
          <div className='film-card' key={idx}>
            <img src={film.poster_url ?? ""} alt={film.title} />
            <span className='film-title'>{film.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
