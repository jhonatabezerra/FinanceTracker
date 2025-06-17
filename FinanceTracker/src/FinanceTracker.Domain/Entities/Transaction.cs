namespace FinanceTracker.Domain.Entities;

public class Transaction : EntityBase
{
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public int CategoryId { get; set; }
    public virtual Category Category { get; set; } = null!;
}
