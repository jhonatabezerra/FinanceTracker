namespace FinanceTracker.Domain.Entities.Models;

/// <summary>
/// Represents a financial transaction with details such as description, date, and associated category.
/// </summary>
public class Transaction : EntityBase
{
    /// <summary>
    /// Gets or sets the description of the transaction.
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the input value for the operation.
    /// </summary>
    public decimal Input { get; set; }

    /// <summary>
    /// Gets or sets the output value for the operation.
    /// </summary>
    public decimal Output { get; set; }

    /// <summary>
    /// Gets or sets the type identifier associated with the object.
    /// </summary>
    public string? Type { get; set; } = null;

    #region Category

    /// <summary>
    /// Gets or sets the unique identifier for the category.
    /// </summary>
    public int CategoryId { get; set; }

    /// <summary>
    /// Gets or sets the category associated with this entity.
    /// </summary>
    public virtual Category Category { get; set; } = null!;

    #endregion
}
