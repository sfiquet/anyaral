import { useState, useEffect } from 'react'

import Container from '../../components/container'
import Meta from '../../components/meta'
import UnavailableNotice from '../../components/unavailable'
import AddForceForm from '../../components/addforceform'

import { getAllItems, dataTypes } from '../../lib/data'

export default function AddForce(props){
  const [isHydrated, setIsHydrated] = useState(false)
  useEffect(() => setIsHydrated(true), [])

  return (
    <Container fullWidthOnMobile={true}>
      <Meta options={{
        title: "Add force", 
        description: "Add a new force",
        }} />
      
      <main className="flex flex-col space-y-2">
        <h1 className='px-16px sm:px-0'>Add Force</h1>
        {isHydrated ? <AddForceForm {...props} /> : <UnavailableNotice />}
      </main>
     
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
    'cost',
    'cost_per',
    'isUniqueCharacter',
    'ruleMaturity',
    'types',
    'abilities',
  ]
  const abilityKeys = [
    'code',
    'name',
    'staminaCost',
    'type',
  ]
  
  let races = getAllItems(dataTypes.race, raceKeys);
  
  let creatures = getAllItems(dataTypes.creature, creatureKeys);
  creatures = creatures.filter(item => item.cost < 999995 && item.ruleMaturity < 5)

  let abilities = getAllItems(dataTypes.ability, abilityKeys)
  abilities = abilities.filter(item => item.type === 'Leadership')
  
  return {
    props: {
      races,
      creatures,
      abilities,
    },
  }
}
