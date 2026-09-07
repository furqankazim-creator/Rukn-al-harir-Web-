import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import Contact from './Contact'

vi.mock('axios')

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Contact form', () => {
  it('shows validation errors and does not submit when required fields are empty', async () => {
    render(<Contact />)

    fireEvent.click(screen.getByRole('button', { name: /submit inquiry/i }))

    expect(await screen.findByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Message is required')).toBeInTheDocument()
    expect(axios.post).not.toHaveBeenCalled()
  })

  it('flags an invalid email format', async () => {
    render(<Contact />)

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'not-an-email' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'A real project inquiry.' } })
    fireEvent.click(screen.getByRole('button', { name: /submit inquiry/i }))

    expect(await screen.findByText('Enter a valid email')).toBeInTheDocument()
    expect(axios.post).not.toHaveBeenCalled()
  })

  it('submits and shows a success message once all fields are valid', async () => {
    axios.post.mockResolvedValue({ data: { message: 'ok', id: 1 } })

    render(<Contact />)

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Prospect' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'jane@example.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'We need civil support works for a residential tower.' },
    })
    fireEvent.click(screen.getByRole('button', { name: /submit inquiry/i }))

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1))
    expect(await screen.findByText(/message sent successfully/i)).toBeInTheDocument()
  })
})
