import { formatStat, formatSize, formatRace, formatAbility } from '../lib/format'
import styles from '../styles/denizen.module.css'

function StatValue({ value }){
  const dash = '–'
  if (value !== dash) return value
  else return (
    <>
      <span className="sr-only">None</span>
      <span aria-hidden="true">{value}</span>
    </>
  )
}

function Stat({ name, value, largeValue, paddingTop }){
  let largeStyle = largeValue ? " text-lg" : ""
  let paddingStyle = paddingTop ? " pt-2" : ""
  return (
    <>
      <div className={["self-center", paddingStyle].join('')}>{ name }</div>
      <div className={["justify-self-center", paddingStyle, largeStyle].join('')}>
        <StatValue value={ value } />
      </div>
    </>
  )
}

function StatGrid({ children }){
  return (
    <div className="grid grid-cols-stats gap-x-2">
      { children }
    </div>
  )
}

function AbilityList({ abilities }){
  return (
    <ul>
      { abilities.map(ability => (
        <li key={ability.rule.code}>{ formatAbility(ability.rule, ability.param1, ability.param2) }</li>
      )) }
    </ul>
  )
}

function DenizenHeader({ denizen }){
  return (
    <header className="box p-16px space-y-2">
      <h1>{ denizen.name }</h1>
      <div className="flex justify-between">
        <ul className={ styles.typeList }>
          { denizen.types.map(type => <li key={type}>{type}</li>) }
        </ul>
        <div>{ formatSize(denizen.size) }</div>
      </div>

      { denizen.tagline.length > 0 ? <blockquote className={ `${styles.tagline} italic text-gray-700` }>{ denizen.tagline }</blockquote> : null }

    </header>
  )
}

function DenizenContent({ denizen }){
  let stamina = null
  if (denizen.stamina > 0){
    stamina = (
      <Stat name="Stamina" value={ formatStat(denizen.stamina) } paddingTop={true} largeValue={true} />
    )
  }

  let abilities = null
  if (denizen.abilities.length > 0){
    abilities = (
      <section className="m-auto p-16px">
        <h2>Abilities</h2>
        <AbilityList abilities={denizen.abilities} />
      </section>
    )
  }

  return (
    <div className="flex flex-wrap justify-start">
      <section className="box p-16px">
        <h2 className="sr-only">Stats</h2>
        <StatGrid>
          <Stat name="Movement" value={ formatStat(denizen.movement, '"') } largeValue={true} />
          <Stat name="Attack" value={ formatStat(denizen.attack) } largeValue={true} />
          <Stat name="Support" value={ formatStat(denizen.support) } largeValue={true} />
          <Stat name="Save" value={ formatStat(denizen.save, '+') } largeValue={true} />
          <Stat name="CR" value={ formatStat(denizen.commandRange, '"') } largeValue={true} />
          { stamina }
        </StatGrid>
      </section>
    
      { abilities }
    </div>
  )
}

function DenizenWeapon({ weapon }){
  if (!weapon) return null

  let abilities = null
  if (weapon.abilities.length > 0){
    abilities = (
      <div className="p-8px">
        <h3 className="sr-only">{`${weapon.name} Abilities`}</h3>
        <AbilityList abilities={ weapon.abilities } />
      </div>
    )
  }

  return (
    <section className="box">
      <h2 className="px-16px pt-16px pb-0 text-center">{ weapon.name }</h2>
      <div className="p-8px flex flex-wrap justify-between sm:justify-evenly">
        <div className="p-8px">
          <h3 className="sr-only">{`${weapon.name} Stats`}</h3>
          <StatGrid>
            <Stat name="Movement" value={ formatStat(weapon.movement, '"') } />
            <Stat name="Range" value={ formatStat(weapon.range, '"') } />
            <Stat name="Attack" value={ formatStat(weapon.attack) } />
          </StatGrid>
        </div>

        { abilities }

      </div>
    </section>
  )    
}

function DenizenFooter({ race, cost }){
  return (
    <footer className="flex justify-between items-center">
      <div className="text-3xl tracking-tighter">{ formatRace(race) }</div>
    
      <div className="flex flex-col justify-center items-center"><span>Cost</span> <span className="text-xl"><StatValue value={ formatStat(cost) } /></span></div>
    </footer>
  )
}

export default function Denizen({ denizen }){
  return (
    <article className="space-y-4 md:space-y-8">
      <DenizenHeader denizen={ denizen } />
      <DenizenContent denizen={ denizen } />
      <DenizenWeapon weapon={ denizen.rangedWeapon } />
      <DenizenFooter race={denizen.race} cost={denizen.cost} />
    </article>
  )
}
