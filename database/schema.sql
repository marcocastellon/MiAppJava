-- Script de creacion de base de datos para MiAppJava
-- Motor: Microsoft SQL Server

-- 1. Crear la Base de Datos (opcional si ya existe)
-- CREATE DATABASE UserManagementDB;
-- GO
-- USE UserManagementDB;
-- GO

-- 2. Crear Tabla de Usuarios
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE Users (
        UserId INT PRIMARY KEY IDENTITY(1,1),
        FirstName NVARCHAR(50) NOT NULL,
        LastName NVARCHAR(50) NOT NULL,
        Age INT CHECK (Age >= 0),
        Email NVARCHAR(100) UNIQUE NOT NULL,
        CreatedAt DATETIME DEFAULT GETDATE(),
        IsActive BIT DEFAULT 1
    );
END
GO

-- 3. Insertar datos de prueba
INSERT INTO Users (FirstName, LastName, Age, Email)
VALUES 
('Juan', 'Perez', 30, 'juan.perez@example.com'),
('Maria', 'Garcia', 25, 'maria.garcia@example.com'),
('Carlos', 'Rodriguez', 35, 'carlos.rod@example.com');
GO

-- 4. Procedimiento para obtener usuarios activos
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GetActiveUsers')
    DROP PROCEDURE GetActiveUsers;
GO

CREATE PROCEDURE GetActiveUsers
AS
BEGIN
    SELECT UserId, FirstName, LastName, Age, Email 
    FROM Users 
    WHERE IsActive = 1;
END
GO
