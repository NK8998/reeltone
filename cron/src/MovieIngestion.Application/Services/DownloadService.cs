using System.IO.Compression;
using System.Text.Json;
using MovieIngestion.Application.Interfaces;

namespace MovieIngestion.Application.Services;

public class DownloadService : IDownloadService
{
    private readonly string _exportFolder;

    public DownloadService(string exportFolder = "")
    {
        if (!string.IsNullOrEmpty(exportFolder))
        {
            _exportFolder = exportFolder;
            Directory.CreateDirectory(_exportFolder);
            return;
        }
        var homePath = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        _exportFolder = Path.Combine(homePath, "cron", "tmdb_exports");

        Directory.CreateDirectory(_exportFolder);
        
    }
    public async Task<HashSet<int>> DownloadLatestExportAsync()
    {
        // Download movie ids from tmdb
        // Store in ~\cron\tmdb_exports\movie_ids_MM_DD_YYYY.json.gz
        // Unzip and read ids into a HashSet<int>
        var today = DateTime.UtcNow;
        var fileName = $"movie_ids_{today:MM_dd_yyyy}.json.gz";
        var url = $"https://files.tmdb.org/p/exports/{fileName}";
        var gzPath = Path.Combine(_exportFolder, fileName);
        var jsonPath = gzPath.Replace(".json.gz", ".json");

        // Download the file
        using (var httpClient = new HttpClient())
        {
            var response = await httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            await using var fs = new FileStream(gzPath, FileMode.Create, FileAccess.Write, FileShare.None);
            await response.Content.CopyToAsync(fs);
        }

        // Extract the .gz file
        using (var gzStream = new FileStream(gzPath, FileMode.Open, FileAccess.Read))
        using (var decompressionStream = new GZipStream(gzStream, CompressionMode.Decompress))
        using (var outFile = new FileStream(jsonPath, FileMode.Create, FileAccess.Write))
        {
            await decompressionStream.CopyToAsync(outFile);
        }

        // Read IDs from the JSON file into a HashSet<int>
        var ids = new HashSet<int>();

        using var reader = new StreamReader(jsonPath);
        string? line;
        while ((line = await reader.ReadLineAsync()) != null)
        {
            var obj = JsonSerializer.Deserialize<TmdbExportLine>(line);
            if (obj != null) ids.Add(obj.Id);
        }

        return ids;
    
    }

    public Task<HashSet<int>> GetPreviousExportAsync()
    {
        throw new NotImplementedException();
    }
}