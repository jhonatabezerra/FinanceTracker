using FinanceTracker.Domain.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Infrastructure.Context;

/// <summary>
/// Application database context for FinanceTracker.
/// </summary>
public class AppDbContext : DbContext
{
    /// <summary>
    /// Gets the database set that provides access to user entities in the context.
    /// </summary>
    /// <remarks>Use this property to query, add, update, or remove users from the underlying database.
    /// Changes made to the returned set are tracked by the context and persisted when SaveChanges is called.</remarks>
    public DbSet<User> Users => Set<User>();

    /// <summary>
    /// Gets the database set that provides access to category entities in the context.
    /// </summary>
    public DbSet<Category> Categories => Set<Category>();

    /// <summary>
    /// Gets the set of transactions tracked by the context.
    /// </summary>
    /// <remarks>Use this property to query, add, update, or remove transaction entities in the database.
    /// Changes made to the returned set are tracked by the context and persisted to the database when SaveChanges is
    /// called.</remarks>
    public DbSet<Transaction> Transactions => Set<Transaction>();

    /// <summary>
    /// Initializes a new instance of the AppDbContext class using the specified options.
    /// </summary>
    /// <param name="options">The options to be used by the DbContext, including configuration such as the database provider, connection
    /// string, and other context settings. Cannot be null.</param>
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}
