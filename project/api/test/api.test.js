import test from 'node:test'
import assert from 'node:assert/strict'
import { app } from '../src/server.js'
import http from 'node:http'

let server
let baseUrl
const request = async (path, options = {}) => fetch(`${baseUrl}${path}`, options)
test.before(() => new Promise((resolve) => { server = http.createServer(app).listen(0, () => { baseUrl = `http://localhost:${server.address().port}`; resolve() }) }))
test.after(() => server.close())

test('health endpoint reports service status', async () => { const response = await request('/health'); assert.equal(response.status, 200); assert.equal((await response.json()).status, 'ok') })
test('login fails closed when database authentication is not configured', async () => { const response = await request('/api/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'learner@academy.test', password: 'wrong' }) }); assert.equal(response.status, 503) })
test('product search returns matching products', async () => { const response = await request('/api/products?q=keyboard'); const body = await response.json(); assert.equal(response.status, 200); assert.equal(body.data[0].name, 'Mechanical keyboard') })
test('cart and order workflow returns an order', async () => { const add = await request('/api/cart', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ productId: 1, quantity: 2 }) }); assert.equal(add.status, 201); const cart = (await add.json()).data; const order = await request('/api/orders', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ items: cart }) }); assert.equal(order.status, 201); assert.equal((await order.json()).data.status, 'CONFIRMED') })
