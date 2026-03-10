# Guía de Recuperación y Configuración del Entorno (Disaster Recovery)

Esta guía detalla los pasos necesarios para recrear este ambiente de desarrollo desde cero en una computadora nueva.

## 1. Requisitos de Software (Instalación en Orden)

Para que el proyecto funcione correctamente, instala las herramientas en este orden:

### Base del Proyecto (Control y FrontEnd)
1.  **Git for Windows**: [Descargar aquí](https://git-scm.com/download/win). Necesario para clonar el repositorio.
2.  **Node.js (LTS)**: [Descargar aquí](https://nodejs.org/). Motor para ejecutar React.

### Motor del Backend
3.  **Microsoft OpenJDK 17**: Necesario para compilar y ejecutar el código Java.
4.  **Librerías (YA INCLUIDAS EN EL REPO)**:
    *   `GSON`: Para manejo de JSON.
    *   `MSSQL JDBC Driver`: Para conexión a la base de datos.
    *(Viven en `backend/lib/`)*

### Base de Datos
5.  **SQL Server Express 2022**: [Descargar aquí](https://www.microsoft.com/es-es/sql-server/sql-server-downloads).
6.  **SQL Server Management Studio (SSMS)**: Herramienta visual opcional.

---

## 2. Configuración Crítica de la Base de Datos

Para que la conexión JDBC funcione, realiza estos ajustes en SQL Server:
*   **Protocolos**: Habilitar **TCP/IP** en el puerto **1433**.
*   **Autenticación**: Habilitar el **Modo Mixto** (SQL Server and Windows Authentication).
*   **Usuario**: Asegurar que el usuario `sa` esté habilitado con el password configurado en `DatabaseConnection.java`.

---

## 3. Pasos para Restaurar el Proyecto

Si ya tienes el software instalado, sigue estos comandos en tu terminal:

1.  **Clonar el código**:
    ```powershell
    git clone https://github.com/marcocastellon/MiAppJava.git
    cd MiAppJava
    ```

2.  **Preparar el FrontEnd**:
    ```powershell
    cd frontend-app
    npm install
    ```

3.  **Configurar SQL Server**:
    *   Ejecuta el archivo `database/schema.sql` en tu instancia local para crear la tabla y datos iniciales.

4.  **Ejecutar la Aplicación**:
    *   **Backend**: Abre una terminal en `backend/` y ejecuta `./build.ps1`.
    *   **Frontend**: Abre otra terminal en `frontend-app/` y ejecuta `npm run dev`.

**La aplicación estará disponible en:**
* Web: `http://localhost:5173`
* API: `http://localhost:8080/api/users`
