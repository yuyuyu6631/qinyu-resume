# ============================================================
#  简历网站一键发布脚本
#  用法：双击 deploy.bat，或在本目录执行 .\deploy.ps1 "提交说明"
#  作用：提交本地改动并推送到 GitHub，Pages 自动重建发布
# ============================================================
param([string]$Message = "更新简历网站")

Set-Location -Path $PSScriptRoot
$ErrorActionPreference = "Stop"

git add -A
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
    Write-Host "没有需要提交的新改动，直接推送。" -ForegroundColor Yellow
}

git push origin main
Write-Host ""
Write-Host "推送完成。GitHub Pages 会在 1-2 分钟内自动更新，刷新网页即可看到最新版本。" -ForegroundColor Green
