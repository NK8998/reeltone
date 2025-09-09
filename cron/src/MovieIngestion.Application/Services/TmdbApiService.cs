using Microsoft.Extensions.Configuration;
using MovieIngestion.Application.Interfaces;
using MovieIngestion.Domain.Entities;
using System.Net.Http;
using System.Net.Http.Json;

namespace MovieIngestion.Application.Services;

public class TmdbApiService : ITmdbApiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public TmdbApiService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["TmdbApiKey"] ?? throw new ArgumentNullException("TmdbApiKey not found in configuration");

        _httpClient.BaseAddress = new Uri("https://api.themoviedb.org/3/");
    }

    public async Task<Movie?> GetMovieDetailsAsync(int movieId)
    {
        var response = await _httpClient.GetAsync($"movie/{movieId}?api_key={_apiKey}&append_to_response=credits,videos");

        if (response.IsSuccessStatusCode)
        {
            var movie = await response.Content.ReadFromJsonAsync<Movie>();
            return movie;
        }
        else
        {
            Console.WriteLine($"Failed to fetch movie details for ID {movieId}. Status Code: {response.StatusCode}");
            return null;
        }
    }

    public async Task<List<Movie>> FetchPopularMoviesAsync(int page = 1)
    {
        var response = await _httpClient.GetAsync($"movie/popular?api_key={_apiKey}&page={page}");

        if (response.IsSuccessStatusCode)
        {
            var result = await response.Content.ReadFromJsonAsync<Movie>();
            return result != null ? new List<Movie> { result } : new List<Movie>();
        }
        else
        {
            Console.WriteLine($"Failed to fetch popular movies. Status Code: {response.StatusCode}");
            return new List<Movie>();
        }
    }
    
    
}