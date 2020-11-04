import { appName } from '../app.config.js'
import Layout from '../components/layout'

function About(){
  return (
    <Layout>
      <main className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl">About {appName}</h1>
        <p>
          This site is a prototype for a <a href="http://worldoftwilight.com">World of Twilight</a> reference. Currently the purpose is to gather feedback on what players need.
        </p>
        <p>
          Please get in touch and tell me what works, what doesn't, and which new features would make it really special.
        </p>
      </main>
    </Layout>
  );
}

export default About;

