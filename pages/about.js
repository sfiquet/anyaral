import { appName } from '../app.config.js'
import Layout from '../components/layout'
import Container from '../components/container'

function About(){
  return (
    <Layout>
      <Container>
        <main className="space-y-4">
          <h1>About {appName}</h1>
          <p>
            This site is a prototype for a <a href="http://worldoftwilight.com">World of Twilight</a> reference. Currently the purpose is to gather feedback on what players need.
          </p>
          <p>
            Please get in touch and tell me what works, what doesn't, and which new features would make it really special.
          </p>
        </main>
      </Container>
    </Layout>
  );
}

export default About;

