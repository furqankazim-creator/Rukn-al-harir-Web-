import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Contact from './Contact'

describe('Contact page', () => {
  it('renders contact details and communication links', () => {
    render(<Contact />)

    expect(screen.getByText(/Contact Details/i)).toBeInTheDocument()
    expect(screen.getByText(/\+971 50 287 4520/i)).toBeInTheDocument()
    expect(screen.getByText(/info@ruknalharir.com/i)).toBeInTheDocument()
    expect(screen.getByText(/DIFC, Dubai, UAE/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /start whatsapp chat/i })).toBeInTheDocument()
  })

  it('renders the location map', () => {
    render(<Contact />)

    expect(screen.getByText(/Our Location/i)).toBeInTheDocument()
    expect(screen.getByTitle(/Rukn Al Harir location/i)).toBeInTheDocument()
  })
})
