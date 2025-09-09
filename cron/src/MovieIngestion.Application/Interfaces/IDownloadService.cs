namespace MovieIngestion.Application.Interfaces;

using MovieIngestion.Domain.Entities;
public interface IDownloadService
{
    /// <summary>
    /// Downloads the latest TMDb daily export and returns IDs in a HashSet.
    /// </summary>
    Task<HashSet<int>> DownloadLatestExportAsync();

    /// <summary>
    /// Loads the IDs from the previous export for comparison.
    /// </summary>
    Task<HashSet<int>> GetPreviousExportAsync();
}