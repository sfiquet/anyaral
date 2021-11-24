import Link from 'next/link'
import { appName } from '../app.config.js'

function HomeContainer({ children }){
  return (
    <div className="flex-grow py-32px px-16px sm:px-4 flex m-auto">
      { children }
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
    <li id={ uid } className="text-center p-6 border border-solid border-gray-200 rounded-xl transition-colors duration-150 ease-in-out hover:border-blue-400">
      <Link href={ url }>
        <a aria-describedby={ descId }>
          <h3 className="mb-4 text-2xl" aria-label={ title }>{`${title} →`}</h3>
        </a>
      </Link>
      <p id={ descId } className="text-xl">{ description }</p>
    </li>
  )
}

export default function Home() {
  return (
    <HomeContainer>

      <main className="flex flex-col justify-evenly items-center space-y-12">
        <div className="space-y-8">
          <h1 className="text-center tracking-tight text-5xl sm:text-6xl leading-normal">
            Streamline Your Game
          </h1>

          <h2 className="text-center text-xl sm:text-2xl leading-normal">
            Keep on top of <a href="http://worldoftwilight.com">World of Twilight</a> rules with {appName}
          </h2>
        </div>

        <Link href="/denizens">
          <a className="block py-2 px-4 rounded bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 text-white hover:text-white focus:text-white">
            <h3 className="text-xl sm:text-2xl">See all denizens</h3>
          </a>
        </Link>
      </main>

    </HomeContainer>
  )
}
