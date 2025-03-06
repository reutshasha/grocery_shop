1. Database Setup - SQL
•	Create Table: 
o	Execute the following SQL command to create the GroceryTransactions table:
SQL
    CREATE TABLE GroceryTransactions (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        TransactionDate DATE NOT NULL,
        Income INT NOT NULL,
        Outcome INT NOT NULL,
        Revenue INT NOT NULL
    );

•	Insert Data: 
o	Execute the following SQL script to insert 100 rows of random data into the GroceryTransactions table:
SQL
    SET NOCOUNT ON;
    DECLARE @i INT = 1;

    WHILE @i <= 100
    BEGIN
        INSERT INTO GroceryTransactions (TransactionDate, Income, Outcome, Revenue)
        VALUES (
            DATEADD(SECOND, ABS(CHECKSUM(NEWID())) % 86400, -- Random time (up to 23:59:59)
            DATEADD(DAY, ABS(CHECKSUM(NEWID())) % DATEDIFF(DAY, '2021-01-01', '2025-03-04'), '2021-01-01')), -- Random date between 2021-01-01 and 2025-03-04
            ABS(CHECKSUM(NEWID())) % 5000 + 100, -- Random income between 100 and 5100
            ABS(CHECKSUM(NEWID())) % 4000 + 50, -- Random outcome between 50 and 4050
            (ABS(CHECKSUM(NEWID())) % 5000 + 100) - (ABS(CHECKSUM(NEWID())) % 4000 + 50) -- Revenue (Income - Outcome)
        );

        SET @i = @i + 1;
    END;
    GO
•	Update Connection String: 
o	In your application's appsettings.json file, update the database connection string to point to your SQL Server instance.
2. Swagger API - Authentication and Transactions
•	Login: 
o	Use the following credentials to authenticate via Swagger:
JSON
    {
        "username": "testuser",
        "password": "Pass1357!"
    }
•	CORS Configuration:
o	Cross-Origin Resource Sharing (CORS) is configured to allow requests only from http://localhost:4200.
•	Authorization:
o	The Transactions controller requires authorization. You must authenticate first through the /Auth endpoint to obtain a valid access token.
