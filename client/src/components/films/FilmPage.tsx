import React from "react";

const FilmCard = ({ film }: { film: any }) => (
  <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
    <img
      src={film.poster_path}
      alt={film.title}
      className='w-full h-72 object-cover'
    />
    <div className='p-4'>
      <h3 className='text-xl font-semibold mb-2'>{film.title}</h3>
      <p className='text-gray-600 text-sm mb-2'>{film.release_date}</p>
      <p className='text-gray-800 text-sm line-clamp-3'>{film.overview}</p>
      <div className='mt-2 text-sm text-yellow-600'>
        ⭐ {film.vote_average} ({film.vote_count} votes)
      </div>
    </div>
  </div>
);

const FilmsPage = ({
  popularFilms,
  recentFilms,
}: {
  popularFilms: any[];
  recentFilms: any[];
}) => {
  const combinedFilms = [
    { title: "🔥 Popular Films", films: popularFilms },
    { title: "🆕 Recently Released", films: recentFilms },
  ];

  return (
    <div className='min-h-screen bg-gray-100 py-10 px-6'>
      <h1 className='text-4xl font-bold mb-8 text-center'>🎬 Films</h1>

      {combinedFilms.map((section) => (
        <div key={section.title} className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>{section.title}</h2>
          <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {section.films.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilmsPage;
