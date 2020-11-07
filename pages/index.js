import { appName } from '../app.config.js'
import Meta from '../components/meta'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from '../styles/Home.module.css'

function HomeLayout({ children }){
  return (
    <div className="min-h-screen flex flex-col">
      <Meta />

      <Header />

      <div className="flex-grow py-32px px-16px sm:px-4 flex m-auto">
        { children }
      </div>

      <Footer />
    </div>
  )
}

export default function Home() {
  return (
    <HomeLayout>

      <main className="flex flex-col justify-evenly items-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-center tracking-tight">
            Welcome
          </h1>

          <p className="text-lg text-center">
            {appName} is a reference app for players of <a href="http://worldoftwilight.com">World of Twilight</a>.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-center text-xl">Features currently available:</h2>

          {/*<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-auto max-w-3xl">*/}
          {/* temporary one-column grid while there's only one option */}
          <div className="grid grid-cols-1 gap-4 w-full sm:w-auto max-w-3xl">
            <a href="/denizens/" className={styles.card}>
              <h3>Denizens <span aria-hidden="true">&rarr;</span></h3>
              <p>Browse denizens of Anyaral by race</p>
            </a>
          </div>
        </div>

      </main>

    </HomeLayout>
  )
}
