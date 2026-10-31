import { render, screen } from '@testing-library/react'
import App from './App'

describe('App routes', () => {
  it('renders the privacy policy page at its route', async () => {
    window.history.pushState({}, '', '/privacy-policy')
    render(<App />)

    expect(await screen.findByRole('heading', { name: /privacy policy/i }, { timeout: 4500 })).toBeInTheDocument()
  })

  it('renders the terms page at its route', async () => {
    window.history.pushState({}, '', '/terms')
    render(<App />)

    expect(await screen.findByRole('heading', { name: /terms & conditions/i }, { timeout: 4500 })).toBeInTheDocument()
  })
})
