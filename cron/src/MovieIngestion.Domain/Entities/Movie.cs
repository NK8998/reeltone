namespace MovieIngestion.Domain.Entities;

public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Overview { get; set; }
    public DateTime ReleaseDate { get; set; }
    public string TmdbId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}