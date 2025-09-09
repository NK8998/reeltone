namespace MovieIngestion.Domain.Entities;

public class ProductionCountry
{
    public string IsoCode { get; set; } = string.Empty;
    public string? Name { get; set; }

    public ICollection<MovieProductionCountry> MovieProductionCountries { get; set; } = new List<MovieProductionCountry>();
}

public class MovieProductionCountry
{
    public int MovieId { get; set; }
    public string IsoCode { get; set; } = string.Empty;

    public Movie Movie { get; set; } = null!;
    public ProductionCountry ProductionCountry { get; set; } = null!;
}
