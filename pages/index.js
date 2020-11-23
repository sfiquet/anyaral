import { appName } from '../app.config.js'
import Meta from '../components/meta'
import Header from '../components/header'
import Footer from '../components/footer'

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

function FeatureList({ children }){
  // temporary one-column grid while there's only one option
  // TO DO: add sm:grid-cols-2 when another item is added
  
  return (
    <ul className="grid grid-cols-1 gap-4 w-full sm:w-auto max-w-3xl">
      { children }
    </ul>
  )
}

function FeatureListItem({ title, description, url, uid }){
  let descId = `${uid}-desc`
  return (
    <li id={ uid } className="text-center p-6 border border-solid border-gray-300 rounded-xl transition-colors duration-150 ease-in-out hover:border-blue-400">
      <a href={ url } aria-describedby={ descId }>
        <h3 className="mb-4 text-2xl" aria-label={ title }>{`${title} →`}</h3>
      </a>
      <p id={ descId } className="text-xl">{ description }</p>
    </li>
  )
}

export default function Home() {
  return (
    <HomeLayout>

      <main className="flex flex-col justify-evenly items-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-center tracking-tight text-4xl">
            Welcome
          </h1>

          <p className="text-xl text-center">
            {appName} is a reference app for players of <a href="http://worldoftwilight.com">World of Twilight</a>.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-center text-3xl">Features</h2>
          <FeatureList>
            <FeatureListItem title="Denizens" description="Browse denizens of Anyaral by race" 
              url="/denizens/" uid="feat-denizens" />
          </FeatureList>
        </div>

      </main>

    </HomeLayout>
  )
}
