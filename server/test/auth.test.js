import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { app, createTestAdmin } from '../test-support/testApp.js'

describe('admin auth', () => {
  test('logs in with correct credentials and returns a token', async () => {
    const admin = createTestAdmin()

    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: admin.email, password: admin.password })

    assert.equal(res.status, 200)
    assert.equal(typeof res.body.token, 'string')
    assert.equal(res.body.user.email, admin.email)
  })

  test('rejects an incorrect password', async () => {
    const admin = createTestAdmin()

    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: admin.email, password: 'wrong-password' })

    assert.equal(res.status, 401)
  })

  test('rejects an unknown email', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'nobody@example.com', password: 'whatever123' })

    assert.equal(res.status, 401)
  })

  test('/api/admin/me requires a bearer token', async () => {
    const res = await request(app).get('/api/admin/me')
    assert.equal(res.status, 401)
  })

  test('/api/admin/me succeeds with a valid token from login', async () => {
    const admin = createTestAdmin()
    const login = await request(app)
      .post('/api/admin/login')
      .send({ email: admin.email, password: admin.password })

    const res = await request(app)
      .get('/api/admin/me')
      .set('Authorization', `Bearer ${login.body.token}`)

    assert.equal(res.status, 200)
    assert.equal(res.body.user.email, admin.email)
  })

  test('rejects a garbage bearer token', async () => {
    const res = await request(app)
      .get('/api/admin/me')
      .set('Authorization', 'Bearer not-a-real-token')

    assert.equal(res.status, 401)
  })
})
