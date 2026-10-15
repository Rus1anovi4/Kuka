@echo off
chcp 65001 > nul
echo ========================================================
echo   Запуск учебного портала: Академия МВД РК
echo   "Современные информационные угрозы и методы защиты"
echo ========================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ОШИБКА] Node.js не найден на вашем компьютере!
    echo Пожалуйста, скачайте и установите Node.js с официального сайта: https://nodejs.org/
    echo После установки перезапустите этот файл.
    echo.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo [ИНФО] Первичная установка зависимостей (может занять 1-2 минуты)...
    call npm install
    echo.
)

echo [УСПЕХ] Запуск локального сервера...
echo Сайт откроется по адресу: http://localhost:3000
echo.
start http://localhost:3000
call npm run dev
pause
