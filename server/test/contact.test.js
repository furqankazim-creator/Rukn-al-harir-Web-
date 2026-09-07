import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { app, db } from '../test-support/testApp.js'

const VALID = {
  name: 'Jane Prospect',
  email: 'jane@example.com',
  phone: '+971501112222',
  project_type: 'civil',
  message: 'We need civil support works for a residential tower.',
}

describe('POST /api/contact', () => {
  test('accepts a valid submission and stores it', async () => {
    const res = await request(app).post('/api/contact').send(VALID)
    assert.equal(res.status, 201)
    assert.equal(typeof res.body.id, 'number')

    const row = db.prepare('SELECT * FROM contact_submissions WHERE id = ?').get(res.body.id)
    assert.equal(row.email, VALID.email)
    assert.equal(row.status, 'new')
  })

  test('rejects a submission missing required fields with 422 + field errors', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: '', email: 'not-an-email', message: 'short' })

    assert.equal(res.status, 422)
    assert.ok(res.body.errors.name)
    assert.ok(res.body.errors.email)
    assert.ok(res.body.errors.message)
  })

  test('rejects an invalid project_type', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...VALID, project_type: 'not-a-real-type' })

    assert.equal(res.status, 422)
    assert.ok(res.body.errors.project_type)
  })

  test('rate-limits after 5 requests from the same IP within the window', async () => {
    // 3 already made above in this file; send enough more to cross the limit.
    let lastStatus
    for (let i = 0; i < 5; i++) {
      const res = await request(app).post('/api/contact').send(VALID)
      lastStatus = res.status
    }
    assert.equal(lastStatus, 429)
  })
})
