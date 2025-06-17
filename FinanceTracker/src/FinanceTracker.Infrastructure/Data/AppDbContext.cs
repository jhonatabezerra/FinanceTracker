using FinanceTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Usuarios => Set<User>();
    public DbSet<Category> Categorias => Set<Category>();
    public DbSet<Transaction> Transacoes => Set<Transaction>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}
