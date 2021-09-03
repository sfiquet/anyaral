import { appName } from '../app.config.js'
import Layout from '../components/layout'
import Container from '../components/container'
import Meta from '../components/meta'

export default function Offline(){
  return (
    <Layout>
      <Container>
        <Meta />
        <main className="space-y-8">
          <h1>No internet connection</h1>
          <p>In offline mode you cannot access pages directly through the browser. 
            That means you cannot use bookmarks or type a URL directly in the address bar.</p>
          <p>Please use the menu to navigate to the required page.</p>
        </main>
      </Container>
    </Layout>
  );
}
