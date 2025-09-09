using MovieIngestion.Domain.Entities;

namespace MovieIngestion.Application.Interfaces;

public interface ICompareService
{
    /// <summary>
    /// Compares yesterday’s IDs with today’s IDs to find new movies.
    /// </summary>
    /// <param name="previousIds">IDs from the last processed export.</param>
    /// <param name="currentIds">IDs from the new export.</param>
    /// <returns>List of new movie IDs not previously ingested.</returns>
    List<int> GetNewMovieIds(HashSet<int> previousIds, HashSet<int> currentIds);
}