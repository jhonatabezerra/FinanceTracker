using FinanceTracker.Domain.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinanceTracker.Infrastructure.Configurations;

public class TransactionConfig : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Description).IsRequired();

        builder.HasOne(t => t.Category)
               .WithMany()
               .HasForeignKey(t => t.CategoryId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}
