using FinanceTracker.Domain.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FinanceTracker.Infrastructure.Configurations;

public class UserConfig : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
               .IsRequired()
               .HasMaxLength(150);

        builder.Property(x => x.Email)
               .IsRequired()
               .HasMaxLength(200);

        builder.Property(x => x.Password)
               .IsRequired()
               .HasMaxLength(200);

        builder.Property(x => x.UserRole)
               .IsRequired()
               .HasConversion<int>();

        builder.Property(x => x.CreatedAt)
               .IsRequired();

        builder.Property(x => x.UpdatedAt)
               .IsRequired(false);
    }
}
