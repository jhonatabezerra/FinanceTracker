namespace FinanceTracker.Domain.Entities.Models;

/// <summary>
/// 
/// </summary>
public class Category : EntityBase
{
    /// <summary>
    /// Gets or sets the name of the category.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the description of the category.
    /// </summary>
    public string Description { get; set; } = string.Empty;
}
