@echo off

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error: Backend installation failed.
    pause
    exit /b 1
) else (
    echo Backend installation successful.
)

echo Copying .env.example to .env...
copy .env.example .env

pause

