import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { app, db } from '../test-support/testApp.js'

describe('public read-only endpoints', () => {
  test('GET /api/gallery requires no auth and only returns visible items', async () => {
    db.prepare(
      'INSERT INTO gallery (filename, path, caption, position, visible) VALUES (?, ?, ?, ?, ?)'
    ).run('a.jpg', '/uploads/gallery/a.jpg', 'Visible one', 0, 1)
    db.prepare(
      'INSERT INTO gallery (filename, path, caption, position, visible) VALUES (?, ?, ?, ?, ?)'
    ).run('b.jpg', '/uploads/gallery/b.jpg', 'Hidden one', 1, 0)

    const res = await request(app).get('/api/gallery')
    assert.equal(res.status, 200)
    assert.ok(res.body.some((g) => g.caption === 'Visible one'))
    assert.ok(!res.body.some((g) => g.caption === 'Hidden one'))
  })

  test('GET /api/settings requires no auth and reflects admin-saved values', async () => {
    db.prepare(
      `INSERT INTO settings (key, value) VALUES ('footer_text', 'Custom footer copy')
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    ).run()

    const res = await request(app).get('/api/settings')
    assert.equal(res.status, 200)
    assert.equal(res.body.footer_text, 'Custom footer copy')
  })
})
