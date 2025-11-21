using FinanceTracker.Domain.Entities.Enums;

namespace FinanceTracker.Domain.Entities.Models;

/// <summary>
/// Represents an application user with identifying and authentication information.
/// </summary>
/// <remarks>The User class includes properties for storing the user's name, email address, password, and the date
/// and time of the last login. It inherits from EntityBase, which may provide common entity functionality such as
/// identifiers or auditing. This class is typically used to manage user accounts and authentication within the
/// application.</remarks>
public class User : EntityBase
{
    /// <summary>
    /// Gets or sets the name associated with the object.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the email address associated with the object.
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the password used for authentication.
    /// </summary>
    public string Password { get; set; } = string.Empty;

    public UserRole UserRole { get; set; }

    /// <summary>
    /// Gets or sets the date and time when the user last logged in.
    /// </summary>
    public DateTime? LastLoginAt { get; set; }
}
