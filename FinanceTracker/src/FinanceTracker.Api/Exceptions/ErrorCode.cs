namespace FinanceTracker.Api.Exceptions;

public enum ErrorCode
{
    /// <summary>
    /// Represents an error that occurs when a required application setting is not found.
    /// </summary>
    /// <remarks>This exception is typically thrown when an attempt to retrieve a configuration value
    /// fails because the specified key does not exist. Ensure that all required application settings are properly
    /// defined in the configuration file or environment.</remarks>
    AppsettingNotFound,
}

public class ApplicationWithCodeException(ErrorCode code, string message) : Exception(message)
{
    public ErrorCode Code { get; } = code;
}
