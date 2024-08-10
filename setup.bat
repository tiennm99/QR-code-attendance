@echo off
echo Installing requirements...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error: Failed to install requirements.
    pause
    exit /b %errorlevel%
)
echo Requirements installed successfully.
pause
