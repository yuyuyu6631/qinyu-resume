# 生成 ATS 可解析的 PDF 简历（由 /print 打印页渲染，Chrome 无头模式）
# 用法: powershell -ExecutionPolicy Bypass -File scripts/gen_pdf.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$chrome = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles(x86)\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles(x86)\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $chrome) {
    Write-Host "未找到 Chrome/Edge，请手动用浏览器打印 /print 页面生成 PDF。" -ForegroundColor Yellow
    exit 1
}

$pdf = Join-Path $root "public\秦宇-测试工程师.pdf"
New-Item -ItemType Directory -Path (Split-Path $pdf) -Force | Out-Null

$outDir = Join-Path $root "out"
if (-not (Test-Path (Join-Path $outDir "print\index.html"))) {
    Write-Host "未找到 out/print/index.html，请先执行 npm run build 生成静态导出。" -ForegroundColor Yellow
    exit 1
}

# 本地服务（服务静态导出产物 out/）
$port = 8899
$server = Start-Job -ScriptBlock {
    param($dir, $port)
    Set-Location $dir
    py -m http.server $port --bind 127.0.0.1
} -ArgumentList $outDir, $port

try {
    Start-Sleep -Seconds 2
    $url = "http://127.0.0.1:$port/print/index.html"
    & $chrome --headless=new --disable-gpu --no-first-run `
        --user-data-dir="$env:TEMP\chrome-pdf-profile" `
        --no-pdf-header-footer --print-to-pdf="$pdf" $url 2>$null
    Start-Sleep -Seconds 2
    if (Test-Path $pdf) {
        Write-Host "PDF 已生成: $pdf ($((Get-Item $pdf).Length) bytes)" -ForegroundColor Green
    } else {
        Write-Host "PDF 生成失败" -ForegroundColor Red
        exit 1
    }
} finally {
    Stop-Job $server -ErrorAction SilentlyContinue
    Remove-Job $server -ErrorAction SilentlyContinue
}
