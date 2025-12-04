// ==================== ADVANCED CART SYSTEM v2.0 ====================
class CartManager {
    constructor() {
        this.cart = [];
        this.orderHistory = [];
        this.loadFromStorage();
        this.initialize();
    }

    initialize() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupNavigation();
        this.initializeMenuItems();
        this.initializeModals();
        this.updateUI();
        this.setupKeyboardShortcuts();
        this.setupBroadcastChannel();
    }

    setupNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        navToggle?.addEventListener('click', () => navMenu.classList.toggle('active'));

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navMenu.classList.remove('active');
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupBroadcastChannel() {
        if ('BroadcastChannel' in window) {
            this.channel = new BroadcastChannel('kitchen-sync');
            this.channel.onmessage = (event) => {
                console.log('Kitchen message:', event.data);
            };
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.openCart();
            }
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('brunchCart');
            const history = localStorage.getItem('orderHistory');
            if (saved) this.cart = JSON.parse(saved);
            if (history) this.orderHistory = JSON.parse(history);
        } catch (e) {
            console.error('Load error:', e);
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('brunchCart', JSON.stringify(this.cart));
            localStorage.setItem('orderHistory', JSON.stringify(this.orderHistory));
        } catch (e) {
            console.error('Save error:', e);
        }
    }

    initializeMenuItems() {
        const items = document.querySelectorAll('.menu-item');
        items.forEach(item => {
            const name = item.querySelector('.item-name');
            const price = item.querySelector('.item-price');
            const section = item.closest('.menu-section');

            if (name && price) {
                const itemName = name.textContent.trim();
                const match = price.textContent.match(/(\d+(?:,\d+)?)/);
                const itemPrice = match ? parseFloat(match[1].replace(',', '.')) : 0;

                // Determinar categoria (cozinha ou bar)
                const sectionId = section?.id || '';
                const category = this.categorizeItem(sectionId, itemName);

                item.dataset.itemName = itemName;
                item.dataset.itemPrice = itemPrice;
                item.dataset.category = category;

                if (!item.querySelector('.add-to-cart')) {
                    const btn = document.createElement('button');
                    btn.className = 'add-to-cart';
                    btn.innerHTML = category === 'bar' ? '🍸' : '🛒';
                    btn.title = 'Adicionar';
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        this.addItem(item);
                        this.animateBtn(btn);
                    };
                    item.appendChild(btn);
                }
            }
        });
    }

    categorizeItem(sectionId, itemName) {
        // Seções que vão para o BAR
        const barSections = ['drinks', 'cocktails', 'wines'];

        // Seções que vão para a COZINHA
        const kitchenSections = ['brunch', 'sands-toasts', 'plates', 'sweet', 'sharing'];

        if (barSections.includes(sectionId)) {
            return 'bar';
        } else if (kitchenSections.includes(sectionId)) {
            return 'kitchen';
        }

        // Fallback: analisar nome do item
        const barKeywords = ['cocktail', 'vinho', 'wine', 'cerveja', 'beer', 'drink', 'juice', 'coffee', 'tea', 'kombucha'];
        const lowerName = itemName.toLowerCase();

        if (barKeywords.some(keyword => lowerName.includes(keyword))) {
            return 'bar';
        }

        return 'kitchen';
    }    animateBtn(btn) {
        btn.style.transform = 'scale(0.7)';
        setTimeout(() => {
            btn.style.transform = 'scale(1.3)';
            setTimeout(() => btn.style.transform = 'scale(1)', 100);
        }, 100);
    }

    initializeModals() {
        const els = {
            cartBtn: document.getElementById('cartButton'),
            cartModal: document.getElementById('cartModal'),
            closeCart: document.getElementById('closeCart'),
            checkoutBtn: document.getElementById('checkoutButton'),
            checkoutModal: document.getElementById('checkoutModal'),
            closeCheckout: document.getElementById('closeCheckout'),
            form: document.getElementById('checkoutForm')
        };

        els.cartBtn?.addEventListener('click', () => this.openCart());
        els.closeCart?.addEventListener('click', () => this.closeCart());
        els.checkoutBtn?.addEventListener('click', () => this.openCheckout());
        els.closeCheckout?.addEventListener('click', () => this.closeCheckout());
        els.form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitOrder();
        });

        [els.cartModal, els.checkoutModal].forEach(modal => {
            modal?.addEventListener('click', (e) => {
                if (e.target === modal) this.closeAllModals();
            });
        });
    }

    addItem(item) {
        const name = item.dataset.itemName;
        const price = parseFloat(item.dataset.itemPrice);
        const category = item.dataset.category || 'kitchen';
        const existing = this.cart.find(i => i.name === name);

        if (existing) {
            existing.quantity++;
            this.notify(`${name} (x${existing.quantity})`);
        } else {
            this.cart.push({ name, price, quantity: 1, time: Date.now(), category });
            this.notify(`✓ ${name}`);
        }

        this.saveToStorage();
        this.updateUI();
        this.beep();
    }    removeItem(index) {
        const item = this.cart[index];
        this.cart.splice(index, 1);
        this.saveToStorage();
        this.updateUI();
        this.updateCartDisplay();
        this.notify(`${item.name} removido`);
    }

    updateQuantity(index, change) {
        if (!this.cart[index]) return;
        this.cart[index].quantity += change;

        if (this.cart[index].quantity <= 0) {
            this.removeItem(index);
        } else {
            this.saveToStorage();
            this.updateUI();
            this.updateCartDisplay();
        }
    }

    clearCart() {
        if (this.cart.length && confirm('Limpar carrinho?')) {
            this.cart = [];
            this.saveToStorage();
            this.updateUI();
            this.updateCartDisplay();
            this.notify('Carrinho limpo');
        }
    }

    updateUI() {
        const count = document.getElementById('cartCount');
        if (!count) return;

        const total = this.cart.reduce((s, i) => s + i.quantity, 0);
        count.textContent = total;
        count.style.display = total > 0 ? 'inline' : 'none';
    }

    updateCartDisplay() {
        const items = document.getElementById('cartItems');
        const total = document.getElementById('totalPrice');

        if (!items || !total) return;

        if (!this.cart.length) {
            items.innerHTML = '<p class="empty-cart">🛒 Carrinho vazio</p>';
            total.textContent = '0€';
            return;
        }

        const sum = this.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
        const count = this.cart.reduce((s, i) => s + i.quantity, 0);

        items.innerHTML = `
            <div class="cart-summary">
                <p>${this.cart.length} tipo(s) • ${count} item(s)</p>
                <button class="clear-cart-btn" onclick="cart.clearCart()">Limpar</button>
            </div>
            ${this.cart.map((item, i) => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price.toFixed(2)}€</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="cart.updateQuantity(${i},-1)">−</button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="qty-btn" onclick="cart.updateQuantity(${i},1)">+</button>
                        <button class="remove-btn" onclick="cart.removeItem(${i})">🗑️</button>
                    </div>
                </div>
            `).join('')}
        `;

        total.textContent = sum.toFixed(2) + '€';
    }

    openCart() {
        const modal = document.getElementById('cartModal');
        if (modal) {
            modal.classList.add('active');
            this.updateCartDisplay();
            document.body.style.overflow = 'hidden';
        }
    }

    closeCart() {
        document.getElementById('cartModal')?.classList.remove('active');
        document.body.style.overflow = '';
    }

    openCheckout() {
        if (!this.cart.length) {
            this.notify('⚠️ Carrinho vazio!');
            return;
        }
        this.closeCart();
        const modal = document.getElementById('checkoutModal');
        if (modal) {
            modal.classList.add('active');
            document.getElementById('customerName')?.focus();
        }
    }

    closeCheckout() {
        document.getElementById('checkoutModal')?.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeAllModals() {
        this.closeCart();
        this.closeCheckout();
    }

    async submitOrder() {
        const name = document.getElementById('customerName')?.value;
        const table = document.getElementById('tableNumber')?.value;
        const notes = document.getElementById('orderNotes')?.value;

        if (!name || !table) {
            this.notify('⚠️ Preencha nome e mesa');
            return;
        }

        // Separar itens por destino
        const kitchenItems = this.cart.filter(item => item.category === 'kitchen');
        const barItems = this.cart.filter(item => item.category === 'bar');

        const totalAmount = this.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
        const orderId = Date.now();

        const baseOrder = {
            id: orderId,
            customerName: name,
            tableNumber: table,
            notes: notes,
            total: totalAmount,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };

        try {
            // Enviar para COZINHA se houver itens
            if (kitchenItems.length > 0) {
                const kitchenOrder = {
                    ...baseOrder,
                    items: kitchenItems,
                    destination: 'kitchen',
                    itemsTotal: kitchenItems.reduce((s, i) => s + (i.price * i.quantity), 0)
                };
                localStorage.setItem('newKitchenOrder', JSON.stringify(kitchenOrder));

                if (this.channel) {
                    this.channel.postMessage({ type: 'new-kitchen-order', order: kitchenOrder });
                }
            }

            // Enviar para BAR se houver itens
            if (barItems.length > 0) {
                const barOrder = {
                    ...baseOrder,
                    items: barItems,
                    destination: 'bar',
                    itemsTotal: barItems.reduce((s, i) => s + (i.price * i.quantity), 0)
                };
                localStorage.setItem('newBarOrder', JSON.stringify(barOrder));

                if (this.channel) {
                    this.channel.postMessage({ type: 'new-bar-order', order: barOrder });
                }
            }

            // Salvar pedido completo no histórico
            const fullOrder = {
                ...baseOrder,
                items: this.cart,
                kitchenItems: kitchenItems.length,
                barItems: barItems.length
            };

            this.orderHistory.push(fullOrder);
            this.saveToStorage();
            this.notify('🎉 Pedido enviado!');
            this.beep(3);

            setTimeout(() => {
                let message = `✅ PEDIDO #${orderId}\n\nMesa: ${table}\nTotal: ${totalAmount.toFixed(2)}€\n\n`;
                if (kitchenItems.length > 0) message += `🍳 Cozinha: ${kitchenItems.length} item(s)\n`;
                if (barItems.length > 0) message += `🍸 Bar: ${barItems.length} item(s)\n`;
                message += '\nPedido enviado!';

                alert(message);
                this.cart = [];
                this.saveToStorage();
                this.updateUI();
                this.closeCheckout();
                document.getElementById('checkoutForm')?.reset();
            }, 600);

        } catch (e) {
            console.error('Order error:', e);
            this.notify('❌ Erro ao enviar');
        }
    }    notify(msg) {
        const n = document.createElement('div');
        n.className = 'cart-notification';
        n.textContent = msg;
        document.body.appendChild(n);

        setTimeout(() => {
            n.style.opacity = '0';
            n.style.transform = 'translateX(400px)';
            setTimeout(() => n.remove(), 300);
        }, 2500);
    }

    beep(count = 1) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const playTone = (freq, time) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = freq;
                gain.gain.value = 0.05;
                osc.start(time);
                osc.stop(time + 0.1);
            };

            for (let i = 0; i < count; i++) {
                playTone(523 + i * 100, ctx.currentTime + i * 0.15);
            }
        } catch (e) {}
    }
}

// Initialize
const cart = new CartManager();
window.cart = cart;

console.log('%c🌿 Brunch da Pampa v2.0 🌿', 'color:#2d5016;font:bold 16px sans-serif');
console.log('%cCtrl+K: Cart | ESC: Close', 'color:#8b7355;font:12px monospace');
