namespace FinanceTracker.Domain.Entities.Models;

/// <summary>
/// Represents the base type for entities with common audit properties such as identifier and timestamps.
/// </summary>
/// <remarks>This class is intended to be inherited by domain entities that require standard properties for
/// tracking creation and modification times. The audit properties can be used for persistence, change tracking, or
/// concurrency control scenarios.</remarks>
public class EntityBase
{
    /// <summary>
    /// Primary key identifier for the entity.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the date and time when the object was created, in Coordinated Universal Time (UTC).
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets the date and time when the entity was last updated.
    /// </summary>
    public DateTime? UpdatedAt { get; set; }
}
