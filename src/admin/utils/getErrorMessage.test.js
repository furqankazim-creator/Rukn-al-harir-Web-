import { describe, it, expect } from 'vitest'
import { getErrorMessage } from './getErrorMessage'

describe('getErrorMessage', () => {
  it('prefers the server-provided message when the API responded', () => {
    const err = { response: { data: { message: 'Invalid email or password' } } }
    expect(getErrorMessage(err, 'fallback')).toBe('Invalid email or password')
  })

  it('returns a connectivity-specific message when the request never got a response', () => {
    const err = { request: {} } // axios sets `request` but no `response` on network failure
    expect(getErrorMessage(err, 'fallback')).toMatch(/can't reach the api server/i)
  })

  it('falls back to the provided message for anything else', () => {
    expect(getErrorMessage({}, 'Could not load services.')).toBe('Could not load services.')
    expect(getErrorMessage(undefined, 'Could not load services.')).toBe('Could not load services.')
  })

  it('does not treat a response-carrying error as a connectivity error', () => {
    const err = { request: {}, response: { data: {} } }
    expect(getErrorMessage(err, 'fallback')).toBe('fallback')
  })
})
