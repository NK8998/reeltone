using MovieIngestion.Domain.Entities;

namespace MovieIngestion.Application.Interfaces;

public interface ITmdbApiService
{
    /// <summary>
    /// Gets detailed information for a single movie from TMDb.
    /// </summary>
    Task<Movie?> GetMovieDetailsAsync(int movieId);

    /// <summary>
    /// Optionally, fetches popular movies from TMDb.
    /// </summary>
    Task<List<Movie>> FetchPopularMoviesAsync(int page = 1);
}
