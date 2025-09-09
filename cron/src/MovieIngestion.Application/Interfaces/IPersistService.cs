using MovieIngestion.Domain.Entities;

namespace MovieIngestion.Application.Interfaces;

public interface IPersistService
{
    /// <summary>
    /// Persists new movies by fetching full details from TMDb and saving to DB.
    /// </summary>
    /// <param name="movieIds">List of new movie IDs to persist.</param>
    Task PersistMoviesAsync(List<int> movieIds);
}
