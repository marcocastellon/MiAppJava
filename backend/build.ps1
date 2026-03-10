# Script de Compilación Manual con JDK 17
$JDK_BIN = "C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot\bin"
$SRC_DIR = "src\main\java"
$BIN_DIR = "bin"

Write-Host "Limpiando y preparando entorno..." -ForegroundColor Cyan
if (Test-Path $BIN_DIR) { Remove-Item -Recurse -Force $BIN_DIR }
New-Item -ItemType Directory -Path $BIN_DIR -Force | Out-Null

# Obtener todos los archivos Java
$JAVA_FILES = Get-ChildItem -Path $SRC_DIR -Recurse -Filter "*.java" | Select-Object -ExpandProperty FullName

Write-Host "Compilando backend con JDK 17..." -ForegroundColor Cyan
$CP = "$BIN_DIR;lib/*"
& "$JDK_BIN\javac.exe" -cp $CP -d $BIN_DIR $JAVA_FILES

if ($LASTEXITCODE -eq 0) {
    Write-Host "Compilación exitosa. Iniciando Servidor API..." -ForegroundColor Green
    # Incluir todos los JARs de la carpeta lib y el directorio bin
    $CP = "$BIN_DIR;lib/*"
    & "$JDK_BIN\java.exe" -cp $CP com.myapp.api.ApiServer
}
else {
    Write-Host "Error en la compilación." -ForegroundColor Red
}
