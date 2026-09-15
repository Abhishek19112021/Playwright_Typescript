import bcrypt from 'bcryptjs'
import pg from 'pg'

const { Pool } = pg
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const email = process.env.SEED_EMAIL || 'learner@academy.test'
const password = process.env.SEED_PASSWORD
if (!password) throw new Error('SEED_PASSWORD is required and must never be committed')
const hash = await bcrypt.hash(password, 12)
await pool.query('INSERT INTO users (email, display_name, password_hash) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash', [email, 'Academy Learner', hash])
await pool.end()
console.log(`Seeded ${email}`)
