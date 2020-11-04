import { appName } from '../app.config.js'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
      <h1 className="text-3xl text-center">
        Welcome
      </h1>

      <p className="text-lg text-center mt-4">
        {appName} is a reference app for players of <a href="http://worldoftwilight.com">World of Twilight</a>.
      </p>

      <h2 className="text-2xl text-center mt-12">Features currently available</h2>
      <div className={styles.grid}>
        <a href="#" className={styles.card}>
          <h3>Denizens <span aria-hidden="true">&rarr;</span></h3>
          <p>Browse denizens of Anyaral by race.</p>
        </a>
      </div>
    </Layout>
  )
}
