import { test, describe, before } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { app, createTestAdmin } from '../test-support/testApp.js'

describe('admin services CRUD', () => {
  let token

  before(async () => {
    const admin = createTestAdmin()
    const login = await request(app)
      .post('/api/admin/login')
      .send({ email: admin.email, password: admin.password })
    token = login.body.token
  })

  test('rejects unauthenticated access', async () => {
    const res = await request(app).get('/api/admin/services')
    assert.equal(res.status, 401)
  })

  test('creates, lists, updates, and deletes a service', async () => {
    const auth = (req) => req.set('Authorization', `Bearer ${token}`)

    const created = await auth(
      request(app).post('/api/admin/services').send({ title: 'MEP Execution Works', position: 1 })
    )
    assert.equal(created.status, 201)
    assert.equal(created.body.title, 'MEP Execution Works')
    const id = created.body.id

    const list = await auth(request(app).get('/api/admin/services'))
    assert.equal(list.status, 200)
    assert.ok(list.body.some((s) => s.id === id))

    const updated = await auth(
      request(app).patch(`/api/admin/services/${id}`).send({ title: 'Updated Title' })
    )
    assert.equal(updated.status, 200)
    assert.equal(updated.body.title, 'Updated Title')

    const deleted = await auth(request(app).delete(`/api/admin/services/${id}`))
    assert.equal(deleted.status, 200)

    const listAfter = await auth(request(app).get('/api/admin/services'))
    assert.ok(!listAfter.body.some((s) => s.id === id))
  })

  test('rejects creating a service without a title', async () => {
    const res = await request(app)
      .post('/api/admin/services')
      .set('Authorization', `Bearer ${token}`)
      .send({ position: 1 })

    assert.equal(res.status, 422)
    assert.ok(res.body.errors.title)
  })
})
