namespace MovieIngestion.Domain.Entities;

public class Movie
{
    public int Id { get; set; }                // TMDb ID
    public string Title { get; set; } = string.Empty;
    public string? OriginalTitle { get; set; }
    public string? OriginalLanguage { get; set; }
    public string? Overview { get; set; }
    public string? Tagline { get; set; }
    public string? Status { get; set; }
    public DateTime? ReleaseDate { get; set; }
    public int? Runtime { get; set; }
    public decimal Budget { get; set; }
    public decimal Revenue { get; set; }
    public double Popularity { get; set; }
    public double VoteAverage { get; set; }
    public int VoteCount { get; set; }
    public bool Adult { get; set; }
    public bool Video { get; set; }
    public string? ImdbId { get; set; }
    public string? Homepage { get; set; }
    public string? BackdropPath { get; set; }
    public string? PosterPath { get; set; }

    // Navigation properties
    public ICollection<MovieGenre> MovieGenres { get; set; } = new List<MovieGenre>();
    public ICollection<MovieProductionCompany> MovieProductionCompanies { get; set; } = new List<MovieProductionCompany>();
    public ICollection<MovieProductionCountry> MovieProductionCountries { get; set; } = new List<MovieProductionCountry>();
    public ICollection<MovieSpokenLanguage> MovieSpokenLanguages { get; set; } = new List<MovieSpokenLanguage>();
    public ICollection<Cast> Casts { get; set; } = new List<Cast>();
    public ICollection<Crew> Crews { get; set; } = new List<Crew>();
    public ICollection<Video> Videos { get; set; } = new List<Video>();
}