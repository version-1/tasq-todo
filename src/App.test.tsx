import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from './App'

describe('App', () => {
  it('renders the initial page', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Tasq Todo' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Your todo list will appear here.'),
    ).toBeInTheDocument()
  })
})
