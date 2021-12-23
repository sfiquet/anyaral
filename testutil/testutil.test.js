/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { useEffect, useState } from 'react';
import { renderOnServer } from './testutil';

function SimpleComponent(){
  return (<p>simple</p>)
}

function ClientServerComponent(){
  const [env, setEnv] = useState('server')
  useEffect(() => setEnv('client'), [])
  return (<h1>{env}</h1>)
}

describe('renderOnServer vs render', () => {
  describe('renderOnServer', () => {
    it('renders the component when the client and server version are identical', () => {
      renderOnServer(<SimpleComponent />)
  
      const text =  screen.getByText(/simple/i)
      expect(text).toBeInTheDocument()
    })
  
    it('renders the server (non-hydrated) version of the component', () => {
      renderOnServer(<ClientServerComponent />)
      
      const serverHeading =  screen.queryByRole('heading', { name: /server/i } )
      expect(serverHeading).toBeInTheDocument()
      const clientHeading =  screen.queryByRole('heading', { name: /client/i } )
      expect(clientHeading).toBeNull()
    })
  })

  describe('render', () => {
    it('renders the component when the client and server version are identical', () => {
      render(<SimpleComponent />)
  
      const text =  screen.getByText(/simple/i)
      expect(text).toBeInTheDocument()
    })
  
    it('renders the client (hydrated) version of the component', () => {
      render(<ClientServerComponent />)
      
      const serverHeading =  screen.queryByRole('heading', { name: /server/i } )
      expect(serverHeading).toBeNull()
      const clientHeading =  screen.queryByRole('heading', { name: /client/i } )
      expect(clientHeading).toBeInTheDocument()
    })
  })
})
