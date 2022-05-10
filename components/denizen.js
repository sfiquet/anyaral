import Meta from '../components/meta'

import { Section, H } from '../components/heading'
import { VALUE_UNDEFINED } from '../lib/constants'
import { formatStat, formatRange, formatSize, formatRace, formatAbility, formatAbilityRule } from '../lib/format'
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
  let largeStyle = largeValue ? " text-lg leading-normal" : ""
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
        <div className='flex flex-wrap justify-between items-center gap-x-3 gap-y-1'>
          <div className="text-3xl tracking-tighter leading-tight">{ denizen.name }</div>
          {denizen.ruleMaturity > 0 &&
            <div className='px-2 py-1 my-1 rounded text-white bg-gray-600'>
              { denizen.ruleMaturity === 1 ? 'play test' : 'experimental' }
            </div>}
        </div>

        <div className="flex justify-between">
          <ul className={ styles.typeList }>
            { denizen.types.map(type => <li key={type}>{type}</li>) }
          </ul>
          <div>{ formatSize(denizen.size) }</div>
        </div>

        { denizen.tagline.length > 0 ? <blockquote className={ `${styles.tagline} italic text-gray-600` }>{ denizen.tagline }</blockquote> : null }
      </div>
    </Section>
  )
}

function StatSection({ denizen }){
  let statCount = 0
  if (denizen.movement  !== VALUE_UNDEFINED) statCount++
  if (denizen.attack  !== VALUE_UNDEFINED) statCount++
  if (denizen.support  !== VALUE_UNDEFINED) statCount++
  if (denizen.save  !== VALUE_UNDEFINED) statCount++
  if (denizen.commandRange  !== VALUE_UNDEFINED) statCount++
  if (denizen.range  !== VALUE_UNDEFINED) statCount++
  if (denizen.stamina  !== VALUE_UNDEFINED && denizen.stamina > 0) statCount++

  if (statCount === 0){
    return null
  }

  return (
    <Section className="box p-16px">
      <H className="sr-only">Stats</H>
      <StatGrid>
        { denizen.movement !== VALUE_UNDEFINED && 
          <Stat name="Movement" value={ formatStat(denizen.movement, '"') } largeValue={true} /> }

        { denizen.attack !== VALUE_UNDEFINED && 
          <Stat name="Attack" value={ formatStat(denizen.attack) } largeValue={true} /> }

        { denizen.support !== VALUE_UNDEFINED && 
          <Stat name="Support" value={ formatStat(denizen.support) } largeValue={true} /> }

        { denizen.save !== VALUE_UNDEFINED && 
          <Stat name="Save" value={ formatStat(denizen.save, '+') } largeValue={true} /> }

        { denizen.commandRange !== VALUE_UNDEFINED && 
          <Stat name="CR" value={ formatStat(denizen.commandRange, '"') } largeValue={true} /> }

        { denizen.range !== VALUE_UNDEFINED && 
          <Stat name="Range" value={ formatRange(denizen.range) } largeValue={true} /> }

        { denizen.stamina !== VALUE_UNDEFINED && denizen.stamina > 0 &&
          <Stat name="Stamina" value={ formatStat(denizen.stamina) } paddingTop={true} largeValue={true} /> }
      </StatGrid>
    </Section>
  )
}

function AbilitySection({ abilities }){
  if (abilities.length <= 0){
    return null
  }

  return (
    <Section className="m-auto p-16px">
      <H>Abilities</H>
      <AbilityList abilities={abilities} />
    </Section>
  )
}

function DenizenContent({ denizen }){
  return (
    <div className="flex flex-wrap justify-start">
      <StatSection denizen={ denizen }/>
      <AbilitySection abilities={ denizen.abilities }/>
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
            <Stat name="Range" value={ formatRange(weapon.range, weapon.minimumRange) } />
            <Stat name="Attack" value={ formatStat(weapon.attack) } />
          </StatGrid>
        </Section>

        { abilities }

      </div>
    </Section>
  )    
}

function CostSingle({ cost }){
  return(
    <StatValue value={ formatStat(cost) } />
  )
}

function CostMultiple({ cost, cost_per }){
  return(
    <>
      <span>{cost_per}</span>
      <span> for </span>
      <StatValue value={ formatStat(cost) } />
    </>
  )
}

function CostStatValue({ cost, cost_per }){
  return (
    <span className="text-xl">
      { cost_per === 1 
        ? <CostSingle cost={cost} /> 
        : <CostMultiple cost={cost} cost_per={cost_per} /> }
    </span>
  )
}

function CostStat({ cost, cost_per }){
  return (
    <div className="flex flex-col justify-center items-center">
      <span>Cost</span>
      { cost !== VALUE_UNDEFINED
        ? <CostStatValue cost={cost} cost_per={cost_per} />
        : <span className="text-xl">n/a</span>
      }
    </div>
  )
}

function DenizenFooter({ race, cost, cost_per }){
  return (
    <Section className="flex justify-between items-center">
      <H className="sr-only">Card Footer: Race and cost</H>
      <div className="text-3xl tracking-tighter">{ formatRace(race) }</div>
      <CostStat cost={cost} cost_per={cost_per} />
    </Section>
  )
}

function DenizenCard({ denizen }){
  return (
    <article className="space-y-4 md:space-y-8">
      <DenizenHeader denizen={ denizen } />
      <DenizenContent denizen={ denizen } />
      <DenizenWeapon weapon={ denizen.rangedWeapon } />
      <DenizenFooter race={denizen.race} cost={denizen.cost} cost_per={denizen.cost_per} />
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
    <Section className="border border-solid border-gray-400 p-4">
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

  if (denizen.cost !== VALUE_UNDEFINED){
    let cost = ''
    if (denizen.cost_per === 1){
      cost = formatStat(denizen.cost)
    } else {
      cost = `${denizen.cost_per} for ${formatStat(denizen.cost)}`
    }
    description += `, Cost: ${ cost }`
  }

  description += `, Types: ${ denizen.types.join(' - ') }`
  
  if (denizen.movement !== VALUE_UNDEFINED){
    description += `, Movement: ${ formatStat(denizen.movement, '"') }`
  }
  
  if (denizen.attack !== VALUE_UNDEFINED){
    description += `, Attack: ${ formatStat(denizen.attack) }`
  }

  if (denizen.support !== VALUE_UNDEFINED){
    description += `, Support: ${ formatStat(denizen.support) }`
  }

  if (denizen.save !== VALUE_UNDEFINED){
    description += `, Save: ${ formatStat(denizen.save, '+') }`
  }
  
  if (denizen.commandRange !== VALUE_UNDEFINED){
    description += `, CR: ${ formatStat(denizen.commandRange, '"') }`
  }
  
  if (denizen.range !== VALUE_UNDEFINED){
    description += `, Range: ${ formatRange(denizen.range) }`
  }
  
  if (denizen.stamina !== VALUE_UNDEFINED && denizen.stamina > 0){
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
