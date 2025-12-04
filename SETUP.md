# Brunch da Pampa - Website Setup Instructions

## ✅ Projeto Concluído

O website do cardápio está 100% funcional com:

- ✅ HTML estruturado com todas as seções do menu
- ✅ CSS responsivo com design moderno
- ✅ JavaScript para navegação e animações
- ✅ README com instruções completas
- ✅ Todas as 8 seções digitalizadas das imagens

## 📂 Arquivos Criados

1. **index.html** - 580 linhas de conteúdo completo do cardápio
2. **styles.css** - 400+ linhas de estilos responsivos
3. **script.js** - Interatividade e animações
4. **README.md** - Documentação completa

## 🎨 Design Features

- Cores do tema: Verde (#2d5016), Marrom (#8b7355), Dourado (#d4a574)
- Fontes: Playfair Display (títulos) + Poppins (texto)
- Layout responsivo: Desktop, Tablet, Mobile
- Animações suaves ao scroll
- Navegação sticky com smooth scroll

## 🚀 Deploy para GitHub Pages

### Passo 1: Criar Repositório no GitHub

```powershell
# No diretório d:\Pampas\
git init
git add .
git commit -m "Add Brunch da Pampa digital menu"
```

### Passo 2: Conectar ao GitHub

1. Crie um novo repositório em https://github.com/new
2. Nome sugerido: `brunch-da-pampa` ou `Pampas`
3. Não adicione README (já temos um)

```powershell
git remote add origin https://github.com/[SEU-USUARIO]/brunch-da-pampa.git
git branch -M main
git push -u origin main
```

### Passo 3: Ativar GitHub Pages

1. Vá para o repositório no GitHub
2. Clique em **Settings** > **Pages**
3. Em **Source**, selecione: `Deploy from a branch`
4. Em **Branch**, selecione: `main` e pasta `/ (root)`
5. Clique em **Save**

⏳ **Aguarde 2-3 minutos** e o site estará disponível em:
`https://[SEU-USUARIO].github.io/brunch-da-pampa/`

## 🔄 Atualizar Conteúdo

Quando precisar atualizar o cardápio:

```powershell
# Edite os arquivos HTML/CSS/JS
git add .
git commit -m "Update menu items"
git push
```

GitHub Pages atualiza automaticamente em ~1 minuto.

## 📋 Menu Sections Digitalizadas

### 1. Brunch - Salads & Soups ✅
- Gardenia (12€)
- Kalamaki Salad (14€)
- Caesar Salad (14€)
- Gaspacho do Dia (8€)

### 2. Sands & Toasts ✅
- John Salmon (13€)
- The British (12€)
- Guacamole Toast (10€)

### 3. Brunch Plates ✅
- Same Same (12€)
- Turkish Eggs (12€)

### 4. Sweet Tooth ✅
- Yogini (7€)
- Suzetinha (9€)
- Homemade Pastelaria (7€)

### 5. Bebidas ✅
- Coffees (2-4,5€)
- Teas & Hot Drinks (4,5-6€)
- Smoothies & Shakes (6-7€)
- Juices & Sodas (4-6€)
- MOM Longevity Drinks (5,5-8€)

### 6. Cocktails ✅
- Signature Cocktails (10-14€)
- Classic Cocktails (6-14€)
- Softs (2,5-8€)
- Cervejas & Sidras (3,5-6€)
- Espirituosas (6-14€)

### 7. Vinhos Naturais ✅
- Tintos (6,5-68€)
- Brancos (6,5-64€)
- Laranjas & Palhete (6,5-46€)
- Espumantes & Rosé (6,5-49€)

### 8. Para Partilhar ✅
- Appetizers: Couvert, Olives, Oysters, Toast, Tartar, Burrata
- Mains: Feijoada, Salad, Ceviche, Tuna Tataki, Bacalhau, Carpaccio, Chicken, Pork
- Desserts: Tarts, Pain Perdu

## 🌐 Domínio Customizado (Opcional)

Se quiser usar um domínio próprio (ex: `brunchdapampa.com`):

1. Compre o domínio (Namecheap, GoDaddy, etc)
2. Crie arquivo `CNAME` na raiz com conteúdo: `brunchdapampa.com`
3. Configure DNS:
   - Type: `A` → IP: `185.199.108.153`
   - Type: `A` → IP: `185.199.109.153`
   - Type: `A` → IP: `185.199.110.153`
   - Type: `A` → IP: `185.199.111.153`
4. No GitHub Pages, adicione o domínio customizado

## 📱 Preview Local

Para visualizar localmente, abra `index.html` diretamente no navegador ou use:

```powershell
# Com Node.js instalado:
npx http-server d:\Pampas -p 8080

# Ou apenas abrir o arquivo:
Start-Process "d:\Pampas\index.html"
```

## ✨ Próximos Passos Sugeridos (Opcional)

- [ ] Adicionar busca/filtro no cardápio
- [ ] Modo escuro/claro
- [ ] Tradução PT/EN com botão
- [ ] Galeria de fotos dos pratos
- [ ] Sistema de reservas
- [ ] QR Code para facilitar acesso

## 📞 Contato

**Email**: nicolas@avila.inc
**Projeto**: Brunch da Pampa Digital Menu
**Data**: 2025

---

**🎉 Website pronto para deploy! 🎉**
