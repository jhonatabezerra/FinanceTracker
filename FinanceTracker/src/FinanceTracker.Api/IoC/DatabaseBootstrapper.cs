using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Api.IoC;

public static class DatabaseBootstrapper
{
    //public static void EnsureDatabase()
    //{
    //    var databaseName = "FinanceTracker";

    //    var masterConnection =
    //        "Server=.\\SQLEXPRESS;Database=master;Trusted_Connection=True;TrustServerCertificate=True";

    //    using (var connection = new SqlConnection(masterConnection))
    //    {
    //        connection.Open();

    //        var cmd = connection.CreateCommand();
    //        cmd.CommandText = $@"
    //            IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'{databaseName}')
    //            BEGIN
    //                CREATE DATABASE [{databaseName}];
    //            END";
    //        cmd.ExecuteNonQuery();
    //    }
    //}
}