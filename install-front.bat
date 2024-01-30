@echo off

echo Installing frontend dependencies...
cd frontend

call npm install
if %errorlevel% neq 0 (
    echo Error: Frontend installation failed.
    pause
    exit /b 1
) else (
    echo Frontend installation successful.
)

echo Copying .env.example to .env...
copy .env.example .env

pause
