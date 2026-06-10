$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "AutoService Queue: preparing local environment..." -ForegroundColor Cyan

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created .env from .env.example" -ForegroundColor Yellow
}

if (-not (Test-Path "node_modules")) {
  Write-Host "Installing npm dependencies..." -ForegroundColor Cyan
  npm install
}

Write-Host "Starting MySQL via Docker Compose..." -ForegroundColor Cyan
docker compose up -d mysql

Write-Host "Waiting for MySQL to accept connections..." -ForegroundColor Cyan
Start-Sleep -Seconds 8

Write-Host "Synchronizing Prisma schema..." -ForegroundColor Cyan
npx prisma db push

Write-Host "Seeding demo users and data..." -ForegroundColor Cyan
npx prisma db seed

Write-Host "Launching Nuxt on http://127.0.0.1:3002" -ForegroundColor Green
npm run dev -- --host 127.0.0.1 --port 3002
