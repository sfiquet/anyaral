import { useEffect, useState } from 'react'
import { appName } from '../app.config.js'

function ToggleButton({ expanded, controlledId, onClick }){
  return (
    <button className="border border-solid border-gray-500 rounded-md p-2 mb-2 space-x-2 sm:hidden" aria-expanded={expanded} aria-controls={controlledId} onClick={ onClick }>
      <svg viewBox="0 0 18 15" width="18px" height="15px" aria-hidden="true" focusable="false">
        <path d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.032C17.335,0,18,0.665,18,1.484L18,1.484z M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.032C17.335,6.031,18,6.696,18,7.516L18,7.516z M18,13.516C18,14.335,17.335,15,16.516,15H1.484 C0.665,15,0,14.335,0,13.516l0,0c0-0.82,0.665-1.483,1.484-1.483h15.032C17.335,12.031,18,12.695,18,13.516L18,13.516z"/>
      </svg>
      <div>Menu</div>
    </button>
  )
}

function MenuItem({ url, children }){
  return(
    <li><a className="justify-center text-current" href={ url }>{ children }</a></li>
  )
}

function MainNav(){
  const [env, setEnv] = useState('server')
  const [isOpen, setIsOpen] = useState(true) // show the list by default (no script)

  // re-initialise the state on the client when the component is mounted
  // useEffect is not run on the server
  useEffect(() => setEnv('client'), [])
  useEffect(() => setIsOpen(false), []) // start with a closed list

  let navLayout = ""
  navLayout += env === 'server' ? "justify-center" : "justify-between"

  let listDisplay = isOpen ? "flex" : "hidden"
  if (env === 'server'){ // we are on the server, building the noscript UI
    listDisplay += " js-hide" // prevent flash of content of open list between loading of static HTML and first render
  } else {
    // in larger mobile widths, display list to the right, under the toggle button
    listDisplay += " xs:ml-auto sm:ml-0"
  }
  const navMenuId = "main-nav-menu"

  return (
    <nav aria-label="Main" role="navigation" className={`${navLayout} flex flex-wrap sm:justify-between items-center mt-2 max-w-3xl mx-auto px-16px sm:px-4`}>
      <a className="text-3xl text-gray-800 font-light tracking-tighter mb-2 mr-4" href="/">{appName}</a>
      
      {env === 'client' && 
        <ToggleButton expanded={isOpen} controlledId={navMenuId} onClick={ () => setIsOpen(!isOpen) } />
      }
      
      <ul id={navMenuId} className={`${listDisplay} w-full xs:w-3/5 sm:w-auto flex-col sm:flex sm:flex-row sm:space-x-4 mb-4 sm:mb-2 border sm:border-0 border-solid border-gray-500 bg-gray-100 sm:bg-opacity-0 divide-y sm:divide-y-0 divid-gray-500`}>
        <MenuItem url="/denizens/">Denizens</MenuItem>
        <MenuItem url="/about/">About</MenuItem>
      </ul>
    </nav>
  )
}

export default function Header(){
  return (
    <header className="w-full border-b border-solid border-gray-500">
      <MainNav />
    </header>
  );
}
