# 🌿 Brunch da Pampa - Cardápio Online

Website de cardápio digital para o restaurante Brunch da Pampa.

## 🎯 Características

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Navegação Suave**: Scroll suave entre seções do cardápio
- **Animações**: Elementos aparecem suavemente ao rolar a página
- **Menu Completo**: Todas as 8 seções do cardápio digitalizadas
- **Multilingue**: Conteúdo em Português e Inglês

## 📋 Seções do Cardápio

1. **Brunch**: Salads & Soups
2. **Sands & Toasts**: Sanduíches e Tostas
3. **Brunch Plates**: Pratos de Brunch
4. **Sweet Tooth**: Sobremesas
5. **Bebidas**: Cafés, Chás, Sumos, Smoothies, Kombuchas
6. **Cocktails**: Signature, Clássicos, Cervejas, Espirituosas
7. **Vinhos Naturais**: Tintos, Brancos, Laranjas, Espumantes, Rosé
8. **Para Partilhar**: Entradas, Pratos Principais, Sobremesas

## 🚀 Deploy para GitHub Pages

### Opção 1: Via Interface do GitHub

1. Faça commit de todos os arquivos para o repositório
2. Vá para **Settings** > **Pages**
3. Em **Source**, selecione `main` branch
4. Clique em **Save**
5. O site estará disponível em: `https://[seu-usuario].github.io/Pampas/`

### Opção 2: Via Linha de Comando

```powershell
# Inicializar repositório (se ainda não foi feito)
git init
git add .
git commit -m "Initial commit: Brunch da Pampa menu website"

# Adicionar repositório remoto
git remote add origin https://github.com/[seu-usuario]/Pampas.git

# Push para GitHub
git branch -M main
git push -u origin main
```

Depois, ative o GitHub Pages nas configurações do repositório.

## 📁 Estrutura de Arquivos

```
d:\Pampas\
├── index.html        # Estrutura HTML do cardápio
├── styles.css        # Estilos CSS responsivos
├── script.js         # JavaScript para interatividade
├── README.md         # Este arquivo
└── .github\
    └── copilot-instructions.md
```

## 🎨 Personalização

### Cores (CSS Variables em `styles.css`)

```css
--primary-color: #2d5016;    /* Verde principal */
--secondary-color: #8b7355;  /* Marrom secundário */
--accent-color: #d4a574;     /* Dourado para preços */
--bg-cream: #faf8f5;         /* Fundo creme */
```

### Fontes

- **Títulos**: Playfair Display (serifa elegante)
- **Texto**: Poppins (sans-serif moderna)

## 📱 Compatibilidade

- ✅ Chrome, Firefox, Safari, Edge (últimas versões)
- ✅ iOS Safari, Chrome Mobile
- ✅ Tablets e dispositivos móveis
- ✅ Telas de 320px até 4K

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, Custom Properties, Animações
- **JavaScript ES6+**: Navegação, Scroll, Animações

## 📄 Licença

© 2025 Brunch da Pampa. Todos os direitos reservados.

## 👨‍💻 Desenvolvimento

Website desenvolvido por Nicolas Ávila (nicolas@avila.inc)

## 🆘 Suporte

Para alterações no cardápio ou suporte técnico, contacte: nicolas@avila.inc

---

**🌟 Bom apetite! 🌟**
