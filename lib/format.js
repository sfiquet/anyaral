const VALUE_SPECIAL = 999999
const VALUE_DASH = 999998
const VALUE_BLAST = 999997
const VALUE_NO_UPPER_LIMIT = 999996
const VALUE_UNDEFINED = 999995

export function formatStat(input, postfix = ''){
  let special = {
    [VALUE_SPECIAL]: 'Special',
    [VALUE_DASH]: '–',
    [VALUE_BLAST]: 'Blast',
    [VALUE_NO_UPPER_LIMIT]: 'No upper limit',
    [VALUE_UNDEFINED]: 'Undefined',
  }

  return special[input] ? special[input] : `${input}${postfix}`
}

export function formatSize(input){
  let sizes = {
    15: 'Tiny',
    30: 'Small',
    40: 'Medium',
    50: 'Large',
    60: 'Huge',
  }
  
  return sizes[input] ? sizes[input] : formatStat(input)  
}

export function formatRace(race){
  return race.culture === '' ? race.theme : `${race.culture} – ${race.theme}`
}

export function formatStaminaCost(cost){
  return "*".repeat(cost)
}

export function formatAbility(ability, param1, param2){
  let name = ability.name
  let staminaCost = formatStaminaCost(ability.staminaCost)
  
  let details = ""
  if (param1.length > 0){
    let params = param2.length > 0 ? `${param1}, ${param2}` : param1
    details = `(${params})`
  }

  let type = `[${ability.type[0]}]` // first letter only
  return `${name}${staminaCost} ${details}${type}`
}
