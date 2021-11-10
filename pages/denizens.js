import Link from 'next/link'
import Container from '../components/container'
import Meta from '../components/meta'
import { formatRace } from '../lib/format'

import styles from '../styles/denizens.module.css'

import { getAllItems, dataTypes } from '../lib/data'

function DenizenItem({ denizen }){
  return (
    <Link href={`/denizens/${denizen.code}`}>
      <a>{ denizen.name }</a>
    </Link>
  )
}

function RaceItem({ raceItem }){
  return (
    <details className={styles.details}>
      <summary className="text-xl"><h2>{raceItem.title}</h2></summary>
      <ul>
        {raceItem.denizens.map(denizen => (
          <li key={denizen.code}>
            <DenizenItem denizen={denizen} />
          </li>
        ))}
      </ul>
    </details>
  )
}

export default function DenizenList({ races, creatures }){
  let raceCodeToTitle = races.reduce((dict, item) => {
    dict[item.code] = formatRace(item)
    return dict
  }, {});

  let creaturesByRace = creatures.slice().sort((a, b) => {
    // sort by race then by name
    if (a.race < b.race) return -1
    else if (a.race > b.race) return 1
    else if (a.name < b.name) return -1
    else if (a.name > b.name) return 1
    return 0
  }).reduce((acc, item) => {
    if (acc.length === 0 || acc[acc.length-1].race !== item.race){
      acc.push({
        race: item.race,
        title: raceCodeToTitle[item.race],
        denizens: [item],
      });
    } else {
      acc[acc.length-1].denizens.push(item)
    }
    return acc
  }, []).sort((a, b) => {
    if (a.title < b.title) return -1
    else if (a.title > b.title) return 1
    return 0
  })

  return (
    <Container>
      <Meta options={{
        title: "Browse Anyaral denizens", 
        description: "Browse World of Twilight denizens by race and quickly check denizens stats",
        }} />
      <div className="flex justify-center">
        <div>
          <h1>Denizens</h1>

          <div id="nav-label" className="sr-only">Denizen selection</div>
          <nav role="navigation" aria-labelledby="nav-label">
            <ul>
              {creaturesByRace.map(item => <li key={item.race}><RaceItem raceItem={item} /></li>)}
            </ul>
          </nav>

        </div>
      </div>
    </Container>
  )
}

export async function getStaticProps() {
  const raceKeys = [
    'code',
    'culture',
    'theme',    
  ]
  const creatureKeys = [
    'code',
    'name',
    'race',
  ]
  let races = getAllItems(dataTypes.race, raceKeys);
  let creatures = getAllItems(dataTypes.creature, creatureKeys);

  return {
    props: {
      races,
      creatures,
    },
  }
}