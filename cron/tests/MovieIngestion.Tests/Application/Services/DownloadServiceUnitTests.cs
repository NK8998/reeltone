using MovieIngestion.Application.Services;
using Xunit;
using Xunit.Abstractions;
public class DownloadServiceUnitTests
{
    private readonly ITestOutputHelper _output;

    public DownloadServiceUnitTests(ITestOutputHelper output)
    {
        _output = output;
    }


    [Fact]
    public void CreateTMDBExportFolder_ShouldCreateFolderIfNotExists()
    {
        // Arrange
        var homePath = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var exportFolder = Path.Combine(homePath, "cron", "tmdb_exports");

        if (Directory.Exists(exportFolder))
        {
            Directory.Delete(exportFolder, recursive: true);
            _output.WriteLine($"Deleted existing folder for test: {exportFolder}");
        }

        // Act
        new DownloadService(); // constructor should recreate folder
        _output.WriteLine($"Created folder for test: {exportFolder}");

        // Assert
        Assert.True(Directory.Exists(exportFolder), $"Expected folder was not created: {exportFolder}");
     
    }
}