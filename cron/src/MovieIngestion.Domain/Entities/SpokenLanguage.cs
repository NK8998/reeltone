namespace MovieIngestion.Domain.Entities;

public class SpokenLanguage
{
    public string IsoCode { get; set; } = string.Empty;
    public string? EnglishName { get; set; }
    public string? Name { get; set; }

    public ICollection<MovieSpokenLanguage> MovieSpokenLanguages { get; set; } = new List<MovieSpokenLanguage>();
}

public class MovieSpokenLanguage
{
    public int MovieId { get; set; }
    public string IsoCode { get; set; } = string.Empty;

    public Movie Movie { get; set; } = null!;
    public SpokenLanguage SpokenLanguage { get; set; } = null!;
}
