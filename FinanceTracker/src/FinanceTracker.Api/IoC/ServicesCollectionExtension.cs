using FinanceTracker.Api.Exceptions;
using FinanceTracker.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Api.IoC
{
    public static class ServicesCollectionExtension
    {
        public static IServiceCollection ConfigureServices(this IServiceCollection services, WebApplicationBuilder builder)
        {
            services.ConfigureAppDbContext(builder);

            // Register application services
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            return services;
        }

        public static IServiceCollection AddFinanceTrackerServices(this IServiceCollection services)
        {
            // Register application services here
            // Example: services.AddScoped<IUserService, UserService>();

            return services;
        }

        public static IServiceCollection AddFinanceTrackerRepositories(this IServiceCollection services)
        {
            // Register repository services here
            // Example: services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }

        public static IServiceCollection ConfigureAppDbContext(this IServiceCollection services, WebApplicationBuilder builder)
        {
            ConfigurationManager configuration = builder.Configuration;

            string connectionString = configuration.GetConnectionString("FinanceTrackerDb")
                ?? throw new ApplicationWithCodeException(ErrorCode.AppsettingNotFound, "Couldn't retrieve FinanceTracker conn from appsettings!");

            string environment = configuration.GetValue<string>("Environment")
                ?? throw new ApplicationWithCodeException(ErrorCode.AppsettingNotFound, "Couldn't retrieve Environment from appsettings!");

            bool isDevelopment = environment == "Development";

            services.AddDbContext<AppDbContext>(options =>
            {
                //options.UseSqlite(connectionString);

                //options.UseSqlServer(connectionString, opt => opt.MigrationsAssembly("DataAccess.EFCore"));

                //if (isDevelopment)
                //    options.EnableSensitiveDataLogging();
            });

            

            return services;
        }
}
}