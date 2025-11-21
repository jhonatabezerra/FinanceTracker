namespace FinanceTracker.Domain.Entities.Enums;

/// <summary>
/// Specifies the set of roles that can be assigned to a user within the system.
/// </summary>
/// <remarks>Use this enumeration to determine the level of access and permissions granted to a user. The
/// available roles are Admin, User, and Guest, each representing a different set of privileges.</remarks>
public enum UserRole
{
    Admin = 1,
    User = 2,
    Guest = 3
}
