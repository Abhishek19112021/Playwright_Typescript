import http from 'k6/http'
import { check, sleep } from 'k6'
import { Trend } from 'k6/metrics'

const baseUrl = __ENV.API_URL || 'http://localhost:3000'
const productSearch = new Trend('product_search_duration')
export const options = { vus: 10, duration: '30s', thresholds: { http_req_failed: ['rate<0.01'], http_req_duration: ['p(95)<500'], product_search_duration: ['p(95)<300'] } }
export default function () {
  const response = http.get(`${baseUrl}/api/products?q=keyboard`)
  productSearch.add(response.timings.duration)
  check(response, { 'products request is successful': (r) => r.status === 200, 'response contains a product': (r) => JSON.parse(r.body).data.length > 0 })
  sleep(1)
}
