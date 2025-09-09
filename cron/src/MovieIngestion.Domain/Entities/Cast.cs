namespace MovieIngestion.Domain.Entities;

public class Cast
{
    public int Id { get; set; }                // TMDb Person ID
    public int MovieId { get; set; }
    public string? Name { get; set; }
    public string? OriginalName { get; set; }
    public int Gender { get; set; }
    public bool Adult { get; set; }
    public string? KnownForDepartment { get; set; }
    public double Popularity { get; set; }
    public string? ProfilePath { get; set; }
    public int CastId { get; set; }
    public string? Character { get; set; }
    public string? CreditId { get; set; }
    public int Order { get; set; }

    public Movie Movie { get; set; } = null!;
}