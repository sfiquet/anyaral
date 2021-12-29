/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { renderOnServer } from '../../testutil/testutil';
import ForcesPage from '../../pages/forces'

describe('Forces', () => {

  describe('Server version (no-script)', () => {

    it('renders the heading', () => {
      renderOnServer(<ForcesPage />)
  
      const heading = screen.getByRole('heading', {
        name: /forces/i,
      })
      expect(heading).toBeInTheDocument()
    })

    it('renders a message saying the functionality is unavailable', () => {
      renderOnServer(<ForcesPage />)
  
      const heading = screen.getByRole('heading', {
        name: /unavailable/i,
      })
      expect(heading).toBeInTheDocument()
    })

    it('doesn\'t render an Add button', () => {
      renderOnServer(<ForcesPage />)
  
      const button = screen.queryByRole('button', {
        name: /add/i,
      })
      expect(button).toBeNull()
    })

    it('doesn\'t render a message about there being no forces', () => {
      renderOnServer(<ForcesPage />)
  
      const text = screen.queryByText(/no forces/i)
      expect(text).toBeNull()      
    })
  })

  describe('Client version', () => {

    it('renders the heading', () => {
      render(<ForcesPage />)
  
      const heading = screen.getByRole('heading', {
        name: /forces/i,
      })
      expect(heading).toBeInTheDocument()
    })

    it('renders an Add button', () => {
      render(<ForcesPage />)
  
      const button = screen.getByRole('button', {
        name: /add/i,
      })
      expect(button).toBeInTheDocument()
    })

    it('displays a message when there are no forces', () => {
      render(<ForcesPage />)
  
      const text = screen.getByText(/no forces/i)
      expect(text).toBeInTheDocument()
    })
  
    it('doesn\'t render a message saying the functionality is unavailable', () => {
      render(<ForcesPage />)
  
      const heading = screen.queryByRole('heading', {
        name: /unavailable/i,
      })
      expect(heading).toBeNull()
    })
  })
})
 