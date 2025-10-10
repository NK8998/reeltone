using System.Text.Json.Serialization;

namespace MovieIngestion.Domain.Entities;

public class ProductionCompany
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("logo_path")]
    public string? LogoPath { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("origin_country")]
    public string? OriginCountry { get; set; }
}


public class MovieProductionCompany
{
    public int MovieId { get; set; }
    public int ProductionCompanyId { get; set; }

    public Movie Movie { get; set; } = null!;
    public ProductionCompany ProductionCompany { get; set; } = null!;
}
