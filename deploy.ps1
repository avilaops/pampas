# Deploy Script for Brunch da Pampa
# Execute este script para fazer deploy no GitHub Pages

Write-Host "🌿 Brunch da Pampa - Deploy para GitHub Pages 🌿" -ForegroundColor Green
Write-Host ""

# Check if git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não está instalado. Por favor instale o Git primeiro." -ForegroundColor Red
    Write-Host "Download: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Navigate to project directory
Set-Location "d:\Pampas"
Write-Host "📂 Diretório: $(Get-Location)" -ForegroundColor Cyan

# Initialize git if not already
if (-not (Test-Path ".git")) {
    Write-Host "🔧 Inicializando repositório Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git inicializado" -ForegroundColor Green
} else {
    Write-Host "✅ Repositório Git já existe" -ForegroundColor Green
}

# Add all files
Write-Host ""
Write-Host "📦 Adicionando arquivos..." -ForegroundColor Yellow
git add .

# Commit
Write-Host ""
$commitMessage = Read-Host "Digite a mensagem do commit (Enter para usar padrão)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Deploy: Brunch da Pampa digital menu"
}

git commit -m $commitMessage
Write-Host "✅ Commit criado: $commitMessage" -ForegroundColor Green

# Check if remote exists
$remoteUrl = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  Nenhum repositório remoto configurado" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Por favor, siga estes passos:" -ForegroundColor Cyan
    Write-Host "1. Crie um novo repositório em: https://github.com/new" -ForegroundColor White
    Write-Host "2. Nome sugerido: brunch-da-pampa" -ForegroundColor White
    Write-Host "3. NÃO adicione README, .gitignore ou licença" -ForegroundColor White
    Write-Host ""

    $repoUrl = Read-Host "Cole a URL do repositório (ex: https://github.com/seu-usuario/brunch-da-pampa.git)"

    if (-not [string]::IsNullOrWhiteSpace($repoUrl)) {
        git remote add origin $repoUrl
        Write-Host "✅ Repositório remoto adicionado" -ForegroundColor Green
    } else {
        Write-Host "❌ URL inválida. Execute o script novamente." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Repositório remoto: $remoteUrl" -ForegroundColor Green
}

# Push to GitHub
Write-Host ""
Write-Host "🚀 Fazendo push para GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ ✅ ✅ DEPLOY CONCLUÍDO COM SUCESSO! ✅ ✅ ✅" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
    Write-Host "1. Vá para o seu repositório no GitHub" -ForegroundColor White
    Write-Host "2. Clique em Settings > Pages" -ForegroundColor White
    Write-Host "3. Em Source, selecione: main branch e / (root)" -ForegroundColor White
    Write-Host "4. Clique em Save" -ForegroundColor White
    Write-Host ""
    Write-Host "⏳ Aguarde 2-3 minutos e seu site estará online!" -ForegroundColor Yellow
    Write-Host ""

    # Try to extract username from remote URL
    if ($remoteUrl -match "github\.com[:/]([^/]+)/([^/\.]+)") {
        $username = $Matches[1]
        $reponame = $Matches[2]
        $siteUrl = "https://$username.github.io/$reponame/"
        Write-Host "🌐 URL do site: $siteUrl" -ForegroundColor Magenta
    }

} else {
    Write-Host ""
    Write-Host "❌ Erro ao fazer push. Verifique suas credenciais do GitHub." -ForegroundColor Red
    Write-Host ""
    Write-Host "Possíveis soluções:" -ForegroundColor Yellow
    Write-Host "1. Configure suas credenciais: git config --global user.name 'Seu Nome'" -ForegroundColor White
    Write-Host "2. Configure seu email: git config --global user.email 'seu@email.com'" -ForegroundColor White
    Write-Host "3. Use Personal Access Token para autenticação" -ForegroundColor White
    Write-Host "   Gere em: https://github.com/settings/tokens" -ForegroundColor White
}

Write-Host ""
Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
