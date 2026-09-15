import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pg from 'pg'

const app = express()
const port = process.env.PORT || 3000
const jwtSecret = process.env.JWT_SECRET
const databaseUrl = process.env.DATABASE_URL
const pool = databaseUrl ? new pg.Pool({ connectionString: databaseUrl, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false }) : null
app.use(cors({ origin: process.env.WEB_ORIGIN || true, credentials: true }))
app.use(express.json())

app.post('/api/auth/login', async (req, res) => {
  if (!pool || !jwtSecret) return res.status(503).json({ error: 'Authentication service is not configured' })
  const email = String(req.body.email || '').trim().toLowerCase()
  const password = String(req.body.password || '')
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' })
  try {
    const result = await pool.query('SELECT id, email, display_name, password_hash FROM users WHERE email = $1', [email])
    const user = result.rows[0]
    if (!user || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn: '1h', issuer: 'abhishek-academy' })
    res.json({ data: { token, user: { id: user.id, email: user.email, displayName: user.display_name } } })
  } catch (error) {
    console.error('Login database error', error)
    res.status(503).json({ error: 'Authentication service unavailable' })
  }
})

const products = [
  { id: 1, name: 'Noise-cancelling headphones', category: 'Audio', price: 7999, stock: 24 },
  { id: 2, name: 'Mechanical keyboard', category: 'Workspace', price: 6499, stock: 18 },
  { id: 3, name: 'Smart fitness watch', category: 'Wearables', price: 11999, stock: 11 },
  { id: 4, name: 'Everyday travel backpack', category: 'Travel', price: 2899, stock: 31 }
]
const transactions = [
  { id: 'txn-1001', name: 'Zepto Groceries', amount: -1240, type: 'Shopping' },
  { id: 'txn-1002', name: 'Salary credit', amount: 86500, type: 'Income' },
  { id: 'txn-1003', name: 'Cedar Bank credit card', amount: -8420, type: 'Payment' }
]
const carts = new Map()

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'abhishek-academy-api' }))
app.get('/api/products', (req, res) => {
  const query = String(req.query.q || '').toLowerCase()
  res.json({ data: products.filter((product) => product.name.toLowerCase().includes(query)) })
})
app.get('/api/products/:id', (req, res) => {
  const product = products.find((item) => item.id === Number(req.params.id))
  product ? res.json({ data: product }) : res.status(404).json({ error: 'Product not found' })
})
app.post('/api/cart', (req, res) => {
  const { userId = 'demo-user', productId, quantity = 1 } = req.body
  const product = products.find((item) => item.id === Number(productId))
  if (!product) return res.status(404).json({ error: 'Product not found' })
  const cart = carts.get(userId) || []
  const existing = cart.find((item) => item.productId === product.id)
  existing ? existing.quantity += Number(quantity) : cart.push({ productId: product.id, name: product.name, price: product.price, quantity: Number(quantity) })
  carts.set(userId, cart)
  res.status(201).json({ data: cart })
})
app.get('/api/cart/:userId', (req, res) => res.json({ data: carts.get(req.params.userId) || [] }))
app.get('/api/accounts/:accountId/transactions', (_req, res) => res.json({ data: transactions }))
app.get('/api/accounts/:accountId/balance', (_req, res) => res.json({ data: { currency: 'INR', amount: 184260.5 } }))
app.post('/api/orders', (req, res) => {
  const { userId = 'demo-user', items = [] } = req.body
  if (!items.length) return res.status(400).json({ error: 'At least one item is required' })
  const total = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
  res.status(201).json({ data: { orderId: `order-${Date.now()}`, userId, status: 'CONFIRMED', total } })
})

app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))
if (!process.env.VERCEL) app.listen(port, () => console.log(`Abhishek Academy API listening on http://localhost:${port}`))
export { app }
