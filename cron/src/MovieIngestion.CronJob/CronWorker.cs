using Microsoft.Extensions.Hosting;
using MovieIngestion.Application.Interfaces;

public class CronWorker : BackgroundService
{
    private readonly IDownloadService _downloadService;
    private readonly ICompareService _compareService;
    private readonly IPersistService _persistService;

    public CronWorker(
        IDownloadService downloadService,
        ICompareService compareService,
        IPersistService persistService)
    {
        _downloadService = downloadService;
        _compareService = compareService;
        _persistService = persistService;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        Console.WriteLine("Cron job started.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var todayIds = await _downloadService.DownloadLatestExportAsync();

                var previousIds = await _downloadService.GetPreviousExportAsync();

                var newIds = _compareService.GetNewMovieIds(previousIds, todayIds);

                if (newIds.Any())
                {
                    Console.WriteLine($"Found {newIds.Count} new movies. Persisting...");
                    await _persistService.PersistMoviesAsync(newIds);
                }
                else
                {
                    Console.WriteLine("No new movies today.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during cron execution: {ex.Message}");
            }

            await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
        }

        Console.WriteLine("Cron job stopped.");
    }
}
