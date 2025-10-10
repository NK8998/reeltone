using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Moq;
using Moq.Protected;
using MovieIngestion.Application.Services;
using MovieIngestion.Domain.Entities;
using Xunit;
using System.Text.Json;

public class TmdbApiServiceUnitTests
{
    [Fact]
    public async Task GetMovieDetailsAsync_ShouldReturnMovie_WhenApiResponseIsSuccessful()
    {
        // ARRANGE
        var movieId = 12345;
        var expectedMovie = new Movie { Id = movieId, Title = "Test Movie" };
        var jsonResponse = JsonSerializer.Serialize(expectedMovie);

        // Mock HttpMessageHandler to simulate TMDB API response
        var handlerMock = new Mock<HttpMessageHandler>();
        handlerMock.Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.Is<HttpRequestMessage>(req =>
                    req.Method == HttpMethod.Get &&
                    req.RequestUri!.ToString().Contains($"movie/{movieId}")),
                ItExpr.IsAny<CancellationToken>()
            )
            .ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(jsonResponse),
            });

        var httpClient = new HttpClient(handlerMock.Object)
        {
            BaseAddress = new Uri("https://api.themoviedb.org/3/")
        };

        // Mock IConfiguration
        var inMemorySettings = new Dictionary<string, string> { { "TmdbApiKey", "fake_api_key" } };
        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build();

        var service = new TmdbApiService(httpClient, configuration);

        // ACT
        var result = await service.GetMovieDetailsAsync(movieId);

        // ASSERT
        Assert.NotNull(result);
        Assert.Equal(expectedMovie.Id, result!.Id);
        Assert.Equal(expectedMovie.Title, result.Title);

        // Verify that HTTP call was made once
        handlerMock.Protected().Verify(
            "SendAsync",
            Times.Once(),
            ItExpr.IsAny<HttpRequestMessage>(),
            ItExpr.IsAny<CancellationToken>()
        );
    }

    [Fact]
    public async Task GetMovieDetailsAsync_ShouldReturnNull_WhenApiResponseFails()
    {
        // ARRANGE
        var movieId = 9999;
        var handlerMock = new Mock<HttpMessageHandler>();
        handlerMock.Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>()
            )
            .ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.NotFound
            });

        var httpClient = new HttpClient(handlerMock.Object);
        var inMemorySettings = new Dictionary<string, string> { { "TmdbApiKey", "fake_api_key" } };
        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build();

        var service = new TmdbApiService(httpClient, configuration);

        // ACT
        var result = await service.GetMovieDetailsAsync(movieId);

        // ASSERT
        Assert.Null(result);
    }
}
