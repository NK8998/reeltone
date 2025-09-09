namespace MovieIngestion.Domain.Entities;

public class ProductionCompany
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? LogoPath { get; set; }
    public string? OriginCountry { get; set; }

    public ICollection<MovieProductionCompany> MovieProductionCompanies { get; set; } = new List<MovieProductionCompany>();
}

public class MovieProductionCompany
{
    public int MovieId { get; set; }
    public int ProductionCompanyId { get; set; }

    public Movie Movie { get; set; } = null!;
    public ProductionCompany ProductionCompany { get; set; } = null!;
}
