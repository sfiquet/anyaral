/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { renderOnServer } from '../../../testutil/testutil';
import AddForce from '../../../pages/forces/add'

describe('Add Force', () => {
  describe('No-script version', () => {
    it('renders the heading', () => {
      renderOnServer(<AddForce races={[]} creatures={[]} abilities={[]} />)
  
      const heading = screen.getByRole('heading', {
        name: /add force/i,
      })
      expect(heading).toBeInTheDocument()
    })

    it('renders a message saying the functionality is unavailable', () => {
      renderOnServer(<AddForce />)
  
      const heading = screen.getByRole('heading', {
        name: /unavailable/i,
      })
      expect(heading).toBeInTheDocument()
    })
  })

  describe('Hydrated version', () => {
    it('renders the heading', () => {
      render(<AddForce races={[]} creatures={[]} abilities={[]} />)
  
      const heading = screen.getByRole('heading', {
        name: /add force/i,
      })
      expect(heading).toBeInTheDocument()
    })

    it('doesn\'t render a message saying the functionality is unavailable', () => {
      render(<AddForce races={[]} creatures={[]} abilities={[]} />)
  
      const heading = screen.queryByRole('heading', {
        name: /unavailable/i,
      })
      expect(heading).toBeNull()
    })
  })
})
