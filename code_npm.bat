@echo off

setlocal

:: Set path to custom node.exe directory
set PATH=E:\Node js\Node files;%PATH%

cls
echo Select an option:
echo.
echo 1. npm init -y
echo 2. npm run start
echo 3. npm run build
echo 4. npm install packages
echo 5. build_win_64
echo 6. build_win_32
echo 7. build_linux
echo 8. build_mos
echo.

set /p choice=Enter your choice (1-4): 

if "%choice%"=="1" (
    call "E:\Node js\Node files\npm" init -y
)

if "%choice%"=="2" (
    call "E:\Node js\Node files\npm" run start
)

if "%choice%"=="3" (
    call "E:\Node js\Node files\npm" run build
)

if "%choice%"=="4" (
    :: call "E:\Node js\Node files\npm" install --save-dev electron electron-builder
    :: call "E:\Node js\Node files\npm" install serialport i2c-bus
    echo No Package install
)

if "%choice%"=="5" (
    call "E:\Node js\Node files\npm" run build_win_64
)

if "%choice%"=="6" (
    call "E:\Node js\Node files\npm" run build_win_32
)

if "%choice%"=="7" (
    call "E:\Node js\Node files\npm" run build_linux
)

if "%choice%"=="8" (
    call "E:\Node js\Node files\npm" run build_mos
)

if not "%choice%"=="1" if not "%choice%"=="2" if not "%choice%"=="3" if not "%choice%"=="4" (
    echo Invalid choice.
)

pause
