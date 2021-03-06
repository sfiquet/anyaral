import Meta from '../components/meta'

import { Section, H } from '../components/heading'
import { formatStat, formatSize, formatRace, formatAbility, formatAbilityRule } from '../lib/format'
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
    <Section className="box p-16px">
      <H className="sr-only">Card Header: Types, size and tagline</H>
      <div className="space-y-2">
        <div className="text-3xl tracking-tighter leading-tight">{ denizen.name }</div>
        
        <div className="flex justify-between">
          <ul className={ styles.typeList }>
            { denizen.types.map(type => <li key={type}>{type}</li>) }
          </ul>
          <div>{ formatSize(denizen.size) }</div>
        </div>

        { denizen.tagline.length > 0 ? <blockquote className={ `${styles.tagline} italic text-gray-700` }>{ denizen.tagline }</blockquote> : null }
      </div>
    </Section>
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
      <Section className="m-auto p-16px">
        <H>Abilities</H>
        <AbilityList abilities={denizen.abilities} />
      </Section>
    )
  }

  return (
    <div className="flex flex-wrap justify-start">
      <Section className="box p-16px">
        <H className="sr-only">Stats</H>
        <StatGrid>
          <Stat name="Movement" value={ formatStat(denizen.movement, '"') } largeValue={true} />
          <Stat name="Attack" value={ formatStat(denizen.attack) } largeValue={true} />
          <Stat name="Support" value={ formatStat(denizen.support) } largeValue={true} />
          <Stat name="Save" value={ formatStat(denizen.save, '+') } largeValue={true} />
          <Stat name="CR" value={ formatStat(denizen.commandRange, '"') } largeValue={true} />
          { stamina }
        </StatGrid>
      </Section>
    
      { abilities }
    </div>
  )
}

function DenizenWeapon({ weapon }){
  if (!weapon) return null

  let abilities = null
  if (weapon.abilities.length > 0){
    abilities = (
      <Section className="p-8px">
        <H className="sr-only">{`${weapon.name} Abilities`}</H>
        <AbilityList abilities={ weapon.abilities } />
      </Section>
    )
  }

  return (
    <Section className="box">
      <H className="px-16px pt-16px pb-0 text-center">{ weapon.name }</H>
      <div className="p-8px flex flex-wrap justify-between sm:justify-evenly">
        <Section className="p-8px">
          <H className="sr-only">{`${weapon.name} Stats`}</H>
          <StatGrid>
            <Stat name="Movement" value={ formatStat(weapon.movement, '"') } />
            <Stat name="Range" value={ formatStat(weapon.range, '"') } />
            <Stat name="Attack" value={ formatStat(weapon.attack) } />
          </StatGrid>
        </Section>

        { abilities }

      </div>
    </Section>
  )    
}

function DenizenFooter({ race, cost }){
  return (
    <Section className="flex justify-between items-center">
      <H className="sr-only">Card Footer: Race and cost</H>
      <div className="text-3xl tracking-tighter">{ formatRace(race) }</div>
      <div className="flex flex-col justify-center items-center"><span>Cost</span> <span className="text-xl"><StatValue value={ formatStat(cost) } /></span></div>
    </Section>
  )
}

function DenizenCard({ denizen }){
  return (
    <article className="space-y-4 md:space-y-8">
      <DenizenHeader denizen={ denizen } />
      <DenizenContent denizen={ denizen } />
      <DenizenWeapon weapon={ denizen.rangedWeapon } />
      <DenizenFooter race={denizen.race} cost={denizen.cost} />
    </article>
  )
}

function Disclosure({ title, children }){
  return (
    <Section>
      <details>
        <summary className="text-xl"><H>{ title }</H></summary>
        { children }
      </details>
    </Section>
  )
}

function AbilityRuleList({ abilities }){
  return (
    <ul>
      { abilities.map(ability => (
        <li key={ability.rule.code}>
          <Section>
            <H>{ formatAbility(ability.rule, ability.param1, ability.param2) }</H>
            <p className="mb-4">{ formatAbilityRule(ability.rule, ability.param1, ability.param2) }</p>
          </Section>
        </li>
      )) }
    </ul>
  )
}

function AbilityDisclosure({ title, abilities }){
  return (
    <Disclosure title={ title }>
      <AbilityRuleList abilities={ abilities } />
    </Disclosure>
  )
}

function DenizenExtra({ denizen }){
  // this content is optional, some denizens won't have any
  let hasAbilities = denizen.abilities.length !== 0
  let hasWeaponAbilities = denizen.rangedWeapon && denizen.rangedWeapon.abilities.length !== 0
  let hasContent = hasAbilities || hasWeaponAbilities
  
  if (!hasContent) return null

  return (
    <Section className="border border-solid border-gray-500 p-4">
      <H className="sr-only">More Information</H>
      <ul>
      { hasAbilities && 
        <li><AbilityDisclosure title="Abilities" abilities={ denizen.abilities } /></li> 
      }
      { hasWeaponAbilities && 
        <li><AbilityDisclosure title={`${denizen.rangedWeapon.name} Abilities`} abilities={ denizen.rangedWeapon.abilities } /></li>
      }
      </ul>
    </Section>
  )
}

export function DenizenHead({ denizen }){
  let description = `Race: ${ formatRace(denizen.race) }`
  description += `, Cost: ${ formatStat(denizen.cost) }`
  description += `, Types: ${ denizen.types.join(' - ') }`
  description += `, Movement: ${ formatStat(denizen.movement, '"') }`
  description += `, Attack: ${ formatStat(denizen.attack) }`
  description += `, Support: ${ formatStat(denizen.support) }`
  description += `, Save: ${ formatStat(denizen.save, '+') }`
  description += `, CR: ${ formatStat(denizen.commandRange, '"') }`
  if (denizen.stamina > 0){
    description += `, Stamina: ${ formatStat(denizen.stamina) }`
  }
  if (denizen.abilities.length > 0){
    description += `, Abilities: ${ denizen.abilities.map(ability => formatAbility(ability.rule, ability.param1, ability.param2)).join(' - ')}`
  }
  if (denizen.rangedWeapon){
    description += `, Ranged Weapon: ${ denizen.rangedWeapon.name }`
  }

  return (
    <Meta options={{
      title: denizen.name,
      description,
    }} />
  )
}

export default function Denizen({ denizen }){
  return (
    <article>
      <h1 className="sr-only">{ denizen.name }</h1>
      
      <div className="space-y-8">
        <Section>
          <H className="sr-only">Identity Card</H>
          <DenizenCard denizen={ denizen } />
        </Section>

        <DenizenExtra denizen={ denizen } />
      </div>
    </article>
  )
}
