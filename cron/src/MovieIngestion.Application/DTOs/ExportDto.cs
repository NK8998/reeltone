using System.Text.Json.Serialization;

public class TmdbExportLine
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("original_title")]
    public string OriginalTitle { get; set; } = string.Empty;

    [JsonPropertyName("adult")]
    public bool Adult { get; set; }

    [JsonPropertyName("popularity")]
    public double Popularity { get; set; }

    [JsonPropertyName("video")]
    public bool Video { get; set; }
}
