using MovieIngestion.Application.Services;
using Xunit;

public class DownloadServiceIntegrationTests
{
    [Fact]
    public async Task DownloadLatestExportAsync_ShouldDownloadUnzipAndReturnIds()
    {
        // Arrange
        var tempFolder = Path.Combine(Path.GetTempPath(), "tmdb_exports_integration_test");
        var service = new DownloadService(tempFolder);

        // Act
        var ids = await service.DownloadLatestExportAsync();
        
        // Assert
        Assert.NotNull(ids);
        Assert.NotEmpty(ids);

        // verify files exist in temp folder
        var today = DateTime.UtcNow;
        var gzFile = Path.Combine(tempFolder, $"movie_ids_{today:MM_dd_yyyy}.json.gz");
        var jsonFile = gzFile.Replace(".json.gz", ".json");

        Assert.True(File.Exists(gzFile), "GZ file should exist");
        Assert.True(File.Exists(jsonFile), "JSON file should exist");

        Assert.True(ids.All(id => id > 0), "All IDs should be positive integers");
    }
}