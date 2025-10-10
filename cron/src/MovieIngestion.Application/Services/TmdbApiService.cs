using Microsoft.Extensions.Configuration;
using MovieIngestion.Application.Interfaces;
using MovieIngestion.Domain.Entities;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;

namespace MovieIngestion.Application.Services;

public class TmdbApiService : ITmdbApiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public TmdbApiService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;

        var tmdbSection = configuration.GetSection("Tmdb");
        _apiKey = tmdbSection["ApiKey"] ?? throw new ArgumentNullException("Tmdb:ApiKey not found in configuration");

        var baseUrl = tmdbSection["ApiBaseUrl"] ?? "https://api.themoviedb.org/3/";
        _httpClient.BaseAddress = new Uri(baseUrl);
    }


public async Task<Movie?> GetMovieDetailsAsync(int movieId)
{
    var url = $"movie/{movieId}?api_key={_apiKey}&append_to_response=credits,videos";

    var response = await _httpClient.GetAsync(url);

    // Console.WriteLine($"[DEBUG] Response Status: {response.StatusCode}");
    // Console.WriteLine($"[DEBUG] Response Headers: {string.Join(", ", response.Headers.Select(h => $"{h.Key}: {string.Join(", ", h.Value)}"))}");

    var content = await response.Content.ReadAsStringAsync();
    if (response.IsSuccessStatusCode)
    {
        var movie = JsonSerializer.Deserialize<Movie>(content, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return movie;
    }
    else
    {
        Console.WriteLine($"[ERROR] Failed to fetch movie details for ID {movieId}. Status Code: {response.StatusCode}");
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