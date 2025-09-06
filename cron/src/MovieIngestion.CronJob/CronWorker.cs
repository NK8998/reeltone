using Microsoft.Extensions.Hosting;

public class CronWorker : IHostedService
{
    public Task StartAsync(CancellationToken cancellationToken)
    {
        // Logic to start the cron job
        Console.WriteLine("Cron job started.");
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        // Logic to stop the cron job
        Console.WriteLine("Cron job stopped.");
        return Task.CompletedTask;
    }

}