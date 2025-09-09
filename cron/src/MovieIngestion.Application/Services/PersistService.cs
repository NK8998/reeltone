using MovieIngestion.Infrastructure.Data;
using MovieIngestion.Application.Interfaces;

namespace MovieIngestion.Application.Services;

public class PersistService : IPersistService
{
    private readonly ITmdbApiService _tmdbApiService;
    private readonly AppDbContext _dbContext;

    public PersistService(ITmdbApiService tmdbApiService, AppDbContext dbContext)
    {
        _tmdbApiService = tmdbApiService;
        _dbContext = dbContext;
    }

    public async Task PersistMoviesAsync(List<int> movieIds)
    {
        foreach (var movieId in movieIds)
        {
            var movie = await _tmdbApiService.GetMovieDetailsAsync(movieId);
            if (movie != null && !_dbContext.Movies.Any(m => m.Id == movie.Id))
            {
                // Check if the movie already exists to avoid duplicates
                if (!_dbContext.Movies.Any(m => m.Id == movie.Id))
                {
                    _dbContext.Movies.Add(movie);
                }
            }
        }

        await _dbContext.SaveChangesAsync();
    }
}