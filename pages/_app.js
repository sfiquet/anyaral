import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const UPDATE_INTERVAL = 24 * 60 * 60 * 1000 // 24 hours
  const [canUpdate, setCanUpdate] = useState(false)
  const updateTimeRef = useRef(null)

  const router = useRouter()

  function getWorkbox(){
    if (typeof window === 'undefined' || 'serviceWorker' in navigator === false) {
      return
    }
    return window.workbox
  }

  useEffect(() => {
    updateTimeRef.current = Date.now()

    const handleRouteChange = (url, { shallow }) => {
      const wb = getWorkbox()
      if (!wb) return

      // how long has it been since last SW update check?
      const time = Date.now()
      if (time - updateTimeRef.current > UPDATE_INTERVAL){
        wb.update()
        updateTimeRef.current = time
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    const wb = getWorkbox()
    if (!wb) return

    wb.addEventListener('waiting', event => {
      setCanUpdate(true) // will display the Update button
    })

    wb.addEventListener('controlling', event => {
      // all SW clients subscribed to this event will reload
      window.location.reload()
    })

    // never forget to call register as auto register is turned off in next.config.js
    wb.register()
    
  }, [])

  const handleUpdateClick = () => {
    const wb = getWorkbox()
    if (!wb || !canUpdate) return

    // Send a message to the waiting service worker, instructing it to activate.
    wb.messageSkipWaiting()
  }

  let updateOptions = { 
    canUpdate, 
    onClick: handleUpdateClick,
  }

  return (
    <Layout updateOptions={updateOptions}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
