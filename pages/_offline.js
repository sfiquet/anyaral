import Container from '../components/container'

export default function Offline(){
  return (
    <Container>
      <main className="space-y-8">
        <h1>No internet connection</h1>
        <p>In offline mode you cannot access pages directly through the browser. 
          That means you cannot use bookmarks or type a URL directly in the address bar.</p>
        <p>Please use the menu to navigate to the required page.</p>
      </main>
    </Container>
  );
}
