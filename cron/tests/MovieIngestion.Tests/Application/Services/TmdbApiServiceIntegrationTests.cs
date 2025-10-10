using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MovieIngestion.Application.Services;
using Xunit;

public class TmdbApiServiceIntegrationTests
{
    private readonly IConfiguration _configuration;

    public TmdbApiServiceIntegrationTests()
    {
        Console.WriteLine("Initializing configuration...");

        _configuration = new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)
            .AddJsonFile("appsettings.dev.json", optional: false, reloadOnChange: true)
            .AddEnvironmentVariables()
            .Build();

        Console.WriteLine("Configuration loaded successfully.");
    }

    [Fact]
    public async Task GetMovieDetailsAsync_ShouldReturnValidMovie_FromRealApi()
    {
        // ARRANGE
        var apiKey = _configuration["Tmdb:ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            Console.WriteLine("Missing TMDB API key! Check appsettings.dev.json or environment variables.");
            Assert.False(true, "Missing TMDB API key.");
        }

        var httpClient = new HttpClient();
        var service = new TmdbApiService(httpClient, _configuration);

        int movieId = 27205; // Inception
        // ACT
        var movie = await service.GetMovieDetailsAsync(movieId);

        // ASSERT
        if (movie == null)
        {
            Console.WriteLine("Movie not found or API call failed.");
            Assert.NotNull(movie);
        }

        Console.WriteLine($"✅ Movie fetched successfully!");
        Console.WriteLine($"Title: {movie!.Title}");
        Console.WriteLine($"Release Date: {movie.ReleaseDate}");
        Console.WriteLine($"Overview (first 100 chars): {movie.Overview?.Substring(0, Math.Min(100, movie.Overview.Length))}...");

        Assert.Equal(movieId, movie.Id);
        Assert.Equal("Inception", movie.Title);
        Assert.NotEmpty(movie.Overview);
        Assert.NotNull(movie.ReleaseDate);
    }
}
