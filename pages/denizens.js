import Link from 'next/link'
import Container from '../components/container'
import Meta from '../components/meta'
import { Section, H } from '../components/heading'
import { formatRace } from '../lib/format'

import styles from '../styles/denizens.module.css'

import { getAllItems, dataTypes } from '../lib/data'

function Maturity({ maturity }){
  if (maturity === 1){
    return <div className='w-5 inline-block flex-shrink-0 text-center rounded text-blue-700 border border-blue-700' aria-hidden="true">P</div>
  } else if (maturity === 2){
    return <div className='w-5 inline-block flex-shrink-0 text-center rounded text-white bg-blue-700 border border-blue-700' aria-hidden="true">E</div>
  } else {
    return null
  }
}

function MaturitySR({ maturity }){
  if (maturity === 1){
    return <div className='sr-only'>(play test)</div>
  } else if (maturity === 2){
    return <div className='sr-only'>(experimental)</div>
  } else {
    return null
  }
}

function DenizenItem({ denizen }){
  return (
    <Link href={`/denizens/${denizen.code}`}>
      <a className='space-x-2'>
        <Maturity maturity={denizen.ruleMaturity}/>
        <div>{ denizen.name }</div>
        <MaturitySR maturity={denizen.ruleMaturity} />
      </a>
    </Link>
  )
}

function RaceItem({ raceItem }){
  return (
    <details className={styles.details}>
      <summary className="text-xl"><h3>{raceItem.title}</h3></summary>
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

function Legend(){
  return(
    <Section className='p-16px sm:p-4 border border-gray-500'>
      <H className='sr-only'>Appendix</H>
      <Section>
        <H>Symbols used</H>
        <p className='mt-2'>Denizens that haven't been released yet are shown with the following symbols:</p>
        <ul>
          <li className='flex mt-2 items-start gap-2'>
            <Maturity maturity={1}/>
            <div>
              <div className='font-medium'>Play test</div>
              <div>Almost ready for release. Extensive testing is needed to ensure balance.</div>
            </div>
          </li>
          <li className='flex mt-2 items-start gap-2'>
            <Maturity maturity={2}/>
            <div>
              <div className='font-medium'>Experimental</div>
              <div>An early peek at future denizens. Rules are likely to evolve before release.</div>
            </div>
          </li>
        </ul>
      </Section>

      <Section>
        <H className='mt-4'>New denizens need testing!</H>
        <p className='mt-2'>If you've been raring to try new denizens, this is your opportunity to get involved!</p>
        <p className='mt-2'>Test those new denizens and help fine-tune them prior to release!</p>
        <p className='mt-2'>All feedback should be sent to Mike Thorp.</p>
      </Section>
    </Section>
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
      
      <h1>Denizens</h1>

      <div className='flex flex-wrap justify-around md:justify-between gap-4'>
        <div className="flex justify-center">
          <Section>
            <H id="nav-label" className="sr-only">Denizens by culture</H>
            <nav role="navigation" aria-labelledby="nav-label">
              <ul>
                {creaturesByRace.map(item => <li key={item.race}><RaceItem raceItem={item} /></li>)}
              </ul>
            </nav>
          </Section>
        </div>

        <div className='w-full sm:w-1/2'>
          <Legend />
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
    'ruleMaturity',
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