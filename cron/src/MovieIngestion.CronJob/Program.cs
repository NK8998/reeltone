using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using MovieIngestion.Application.Services;
using MovieIngestion.Application.Interfaces;
using MovieIngestion.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

class Program
{
    static async Task Main(string[] args)
    {
        var host = Host.CreateDefaultBuilder(args)
        .ConfigureAppConfiguration((context, config) =>
        {
            config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
        })
        .ConfigureServices((context, services) =>
        {
            var connectionString = context.Configuration.GetConnectionString("DefaultConnection"); ;

            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString));

            // Register application services
            services.AddHttpClient<ITmdbApiService, TmdbApiService>();
            services.AddScoped<IMovieIngestionService, MovieIngestionService>();

            // register the background worker
            services.AddHostedService<CronWorker>();
        })
        .Build();
        await host.RunAsync();
    }
}