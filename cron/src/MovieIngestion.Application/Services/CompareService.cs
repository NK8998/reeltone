using MovieIngestion.Application.Interfaces;

namespace MovieIngestion.Application.Services;

public class CompareService : ICompareService
{
    public List<int> GetNewMovieIds(HashSet<int> previousIds, HashSet<int> currentIds)
    {
        var newIds = new HashSet<int>(currentIds);
        newIds.ExceptWith(previousIds);

        // Convert to list for iteration downstream
        return newIds.ToList();
    }
}