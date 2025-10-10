using System.Text.Json.Serialization;

namespace MovieIngestion.Domain.Entities;

public class Genre
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }
}


public class MovieGenre
{
    public int MovieId { get; set; }
    public int GenreId { get; set; }

    public Movie Movie { get; set; } = null!;
    public Genre Genre { get; set; } = null!;
}