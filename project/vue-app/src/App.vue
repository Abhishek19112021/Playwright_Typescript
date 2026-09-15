<script setup>
import { computed, ref } from 'vue'

const authenticated = ref(false)
const email = ref('')
const password = ref('')
const authError = ref('')
const activeApp = ref('shop')
const search = ref('')
const cart = ref([])
const showCart = ref(false)
const notice = ref('')
const products = [
  { id: 1, name: 'Noise-cancelling headphones', category: 'Audio', price: 7999, rating: '4.8', color: '#dce8f3', emoji: '◒' },
  { id: 2, name: 'Mechanical keyboard', category: 'Workspace', price: 6499, rating: '4.7', color: '#f7dfd2', emoji: '⌨' },
  { id: 3, name: 'Smart fitness watch', category: 'Wearables', price: 11999, rating: '4.6', color: '#dcebdc', emoji: '◷' },
  { id: 4, name: 'Everyday travel backpack', category: 'Travel', price: 2899, rating: '4.9', color: '#f4e7bd', emoji: '▣' }
]
const transactions = [
  { name: 'Zepto Groceries', date: 'Today, 11:42 AM', amount: '- ₹1,240.00', icon: 'Z', type: 'Shopping' },
  { name: 'Salary credit', date: '15 Sep 2026', amount: '+ ₹86,500.00', icon: '↙', type: 'Income' },
  { name: 'Cedar Bank · Credit card', date: '14 Sep 2026', amount: '- ₹8,420.00', icon: 'C', type: 'Payment' },
  { name: 'Metro recharge', date: '12 Sep 2026', amount: '- ₹500.00', icon: 'M', type: 'Travel' }
]
const filteredProducts = computed(() => products.filter((p) => p.name.toLowerCase().includes(search.value.toLowerCase())))
const cartCount = computed(() => cart.value.reduce((n, item) => n + item.quantity, 0))
const cartTotal = computed(() => cart.value.reduce((n, item) => n + item.price * item.quantity, 0))
const money = (n) => `₹${n.toLocaleString('en-IN')}`
function notify(message) { notice.value = message; window.setTimeout(() => { notice.value = '' }, 2400) }
function addToCart(product) { const item = cart.value.find((p) => p.id === product.id); item ? item.quantity++ : cart.value.push({ ...product, quantity: 1 }); notify(`${product.name} added to cart.`) }
function removeFromCart(item) { cart.value = cart.value.filter((p) => p.id !== item.id); notify('Item removed from cart.') }
function checkout() { notify('Checkout flow opened for testing.') }
function bankAction(action) { notify(`${action} flow opened for testing.`) }
async function login() {
  authError.value = ''
  if (!email.value || !password.value) { authError.value = 'Enter your email and password.'; return }
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: email.value, password: password.value }) })
    const body = await response.json()
    if (!response.ok) { authError.value = body.error || 'Unable to sign in.'; return }
    sessionStorage.setItem('academy_token', body.data.token)
    authenticated.value = true
  } catch {
    authError.value = 'Authentication service unavailable. Please try again later.'
  }
}
</script>

<template>
  <main v-if="!authenticated" class="login-screen">
    <section class="login-panel"><div class="login-mark">A</div><p class="login-kicker">ABHISHEK ACADEMY · PRIVATE LAB</p><h1>Sign in to the<br><em>enterprise lab.</em></h1><p>Access MarketOne, Cedar Bank, API exercises, and the automation workflows from one controlled training environment.</p><form @submit.prevent="login"><label>Email<input v-model="email" type="email" placeholder="learner@academy.test" autocomplete="username"></label><label>Password<input v-model="password" type="password" placeholder="Enter your password" autocomplete="current-password"></label><button type="submit">Sign in securely <span>→</span></button><p v-if="authError" class="auth-error" role="alert">{{ authError }}</p></form><small>Credentials are verified against the academy PostgreSQL database.</small></section><aside class="login-art"><div class="login-orbit"></div><strong>QA<br><em>CRAFT</em></strong><span>PLAYWRIGHT</span><span>API + DATA</span><span>PERFORMANCE</span></aside>
  </main>
  <template v-else>
  <div v-if="notice" class="toast" role="status">{{ notice }}</div>
  <div class="academy-bar"><span class="academy-brand"><b>A</b> ABHISHEK ACADEMY</span><span class="academy-label">ENTERPRISE APPLICATION TESTBED</span><div class="academy-actions"><button :class="{ active: activeApp === 'shop' }" @click="activeApp = 'shop'">MarketOne</button><button :class="{ active: activeApp === 'bank' }" @click="activeApp = 'bank'">Cedar Bank</button><span class="user-dot">JD</span></div></div>

  <main v-if="activeApp === 'shop'" class="shop-shell">
    <header class="shop-header"><div class="market-logo"><span class="market-mark">M</span><span><strong>market<span>one</span></strong><small>SMARTER EVERY DAY</small></span></div><div class="delivery"><span>Deliver to</span><strong>400001 Mumbai ▾</strong></div><div class="search-wrap"><input v-model="search" placeholder="Search products, brands and more" aria-label="Search products"><button @click="notify(search ? `Showing results for ${search}.` : 'Type a product name to search.')">⌕</button></div><button class="header-link" @click="notify('Account profile opened for testing.')">Hello, JD<br><strong>Account & Lists ▾</strong></button><button class="header-link" @click="notify('Order history opened for testing.')">Returns<br><strong>& Orders</strong></button><button class="cart-button" @click="showCart = true">▱ <b>{{ cartCount }}</b><span>Cart</span></button></header>
    <nav class="shop-nav"><span @click="notify('All departments opened.')">☰ All</span><span @click="notify('Fresh category selected.')">Fresh</span><span @click="notify('Electronics category selected.')">Electronics</span><span @click="notify('Home & Kitchen category selected.')">Home & Kitchen</span><span @click="notify('Fashion category selected.')">Fashion</span><span @click="notify('Books category selected.')">Books</span><span @click="notify('Today deals opened.')">Today's deals</span><span class="nav-right">Test data: <b>staging-east-1</b></span></nav>
    <section class="shop-content"><div class="breadcrumb">Home / Electronics / Featured picks</div><div class="shop-hero"><div><p class="shop-kicker">THE WEEKEND EDIT</p><h1>Make room for<br><em>better everyday.</em></h1><p>Thoughtful tools for work, play and everything between. Tested for real life.</p><button class="shop-cta" @click="notify('Weekend edit loaded.')">Explore the edit <span>→</span></button></div><div class="hero-product"><div class="hero-ring"></div><span>◒</span><small>UP TO 35% OFF</small></div></div>
      <div class="shop-title"><div><p class="shop-kicker">RECOMMENDED FOR YOU</p><h2>Popular near you</h2></div><button @click="notify('Complete product catalog loaded.')">View all →</button></div>
      <div class="product-grid"><article v-for="product in filteredProducts" :key="product.id" class="product-card"><div class="product-image" :style="{ background: product.color }"><span>{{ product.emoji }}</span><button class="wish" @click="notify(`${product.name} saved to wishlist.`)">♡</button></div><p class="product-category">{{ product.category }}</p><h3>{{ product.name }}</h3><div class="rating">★ {{ product.rating }} <span>· 1,240 reviews</span></div><strong class="price">{{ money(product.price) }}</strong><button class="add-button" @click="addToCart(product)">Add to cart <span>+</span></button></article></div>
    </section>
    <div v-if="showCart" class="drawer-backdrop" @click.self="showCart = false"><aside class="cart-drawer"><div class="drawer-head"><h2>Your cart <span>({{ cartCount }})</span></h2><button @click="showCart = false">×</button></div><p v-if="!cart.length" class="empty-cart">Your cart is ready for its first find.</p><div v-for="item in cart" :key="item.id" class="cart-item"><div class="cart-thumb" :style="{ background: item.color }">{{ item.emoji }}</div><div><strong>{{ item.name }}</strong><span>Qty {{ item.quantity }}</span><b>{{ money(item.price * item.quantity) }}</b><button @click="removeFromCart(item)">Remove</button></div></div><div v-if="cart.length" class="cart-total"><span>Subtotal</span><strong>{{ money(cartTotal) }}</strong><button class="shop-cta" @click="checkout">Proceed to checkout →</button></div></aside></div>
  </main>

  <main v-else class="bank-shell"><header class="bank-header"><div class="bank-logo"><span class="bank-mark">C</span><div><strong>cedar<span>bank</span></strong><small>PRIVATE. SIMPLE. SECURE.</small></div></div><nav><a class="active" @click="bankAction('Overview')">Overview</a><a @click="bankAction('Payments')">Payments</a><a @click="bankAction('Cards')">Cards</a><a @click="bankAction('Investments')">Investments</a><a @click="bankAction('Support')">Support</a></nav><button class="secure-pill" @click="bankAction('Secure session')">◉ Secure session</button><div class="bank-user">JD <span>⌄</span></div></header><section class="bank-content"><div class="bank-welcome"><div><p class="bank-kicker">TUESDAY, 16 SEPTEMBER 2026</p><h1>Good morning, Jay.</h1><p>Here is your financial snapshot.</p></div><button class="outline-button" @click="bankAction('Statement download')">Download statement ↓</button></div><div class="bank-grid"><section class="balance-card"><div class="balance-top"><span>AVAILABLE BALANCE</span><span>◉</span></div><h2>₹1,84,260<span>.50</span></h2><div class="account-number">Cedar savings ···· 4821</div><div class="balance-foot"><span>+ ₹24,500 this month</span><span>Updated just now</span></div></section><section class="quick-actions"><p class="bank-kicker">QUICK ACTIONS</p><div class="action-row"><button @click="bankAction('Send money')"><span>↗</span>Send money</button><button @click="bankAction('Add money')"><span>＋</span>Add money</button><button @click="bankAction('Pay bills')"><span>▣</span>Pay bills</button></div><div class="action-row"><button @click="bankAction('Manage UPI')"><span>⌁</span>Manage UPI</button><button @click="bankAction('Statements')"><span>▤</span>Statements</button><button @click="bankAction('More banking')"><span>⋯</span>More</button></div></section></div><div class="bank-columns"><section class="transactions"><div class="panel-title"><div><p class="bank-kicker">MONEY MOVEMENT</p><h2>Recent transactions</h2></div><button @click="bankAction('All transactions')">See all →</button></div><div v-for="transaction in transactions" :key="transaction.name" class="transaction"><span class="transaction-icon">{{ transaction.icon }}</span><div><strong>{{ transaction.name }}</strong><small>{{ transaction.date }} · {{ transaction.type }}</small></div><b :class="{ income: transaction.amount.startsWith('+') }">{{ transaction.amount }}</b></div></section><section class="security-panel"><p class="bank-kicker">SECURITY CENTRE</p><h2>Your account is protected.</h2><p>Last login: today at 09:18 AM<br>New Delhi, India</p><div class="security-line"><span></span><strong>Strong protection</strong></div><button @click="bankAction('Security settings')">Review security settings →</button></section></div></section></main>
</template>
</template>
