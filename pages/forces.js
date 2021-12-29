import { useEffect, useState } from 'react'
import Container from '../components/container'
import Meta from '../components/meta'

function ForcesManager(){
  return (
    <>
      <button className="block py-2 px-4 rounded bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 text-white hover:text-white focus:text-white">Add Force</button>
      <div>You currently have no forces. Use the Add Force button to create one.</div>
    </>
  )
}

function UnavailableNotice(){
  return (
    <div>
      <h2>Unavailable feature</h2>
      <p>Sorry, this feature requires javascript to function.</p>
    </div>
  )
}

export default function ForcesPage(){
  const [env, setEnv] = useState('server')
  
  // re-initialise the state on the client when the component is mounted
  // useEffect is not run on the server
  useEffect(() => setEnv('client'), [])

  return (
    <Container>
      <Meta options={{
        title: "Browse forces", 
        description: "Browse your forces",
        }} />
      <div className="flex justify-center">
        <div className="space-y-2">
          <h1>Forces</h1>
          {env === 'server' ? <UnavailableNotice /> : <ForcesManager />}
        </div>
      </div>
    </Container>
  )
}
