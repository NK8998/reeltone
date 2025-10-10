using System.Text.Json.Serialization;

namespace MovieIngestion.Domain.Entities;

public class Video
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("iso_639_1")]
    public string? Iso639_1 { get; set; }

    [JsonPropertyName("iso_3166_1")]
    public string? Iso3166_1 { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("key")]
    public string? Key { get; set; }

    [JsonPropertyName("site")]
    public string? Site { get; set; }

    [JsonPropertyName("size")]
    public int Size { get; set; }

    [JsonPropertyName("type")]
    public string? Type { get; set; }

    [JsonPropertyName("official")]
    public bool Official { get; set; }

    [JsonPropertyName("published_at")]
    public DateTime PublishedAt { get; set; }
}
