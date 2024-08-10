@echo off
echo Starting the application...
python app.py
if %errorlevel% neq 0 (
    echo Error: Failed to run the application.
    pause
    exit /b %errorlevel%
)
pause
