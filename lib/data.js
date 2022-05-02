import fs from 'fs'
import {join} from 'path'

const dataDir = join(process.cwd(), 'data');

export const dataTypes = {
  creature: 'creature',
  race: 'race',
  ability: 'ability',
  weapon: 'weapon',
}

const dataFiles = {
  creature: 'creatures_list.json',
  race: 'races_list.json',
  ability: 'abilities_list.json',
  weapon: 'ranged_weapons_list.json',
}

function readJsonFile(dataFile){
  let json = fs.readFileSync(dataFile, {encoding: 'utf8'});
  return JSON.parse(json);
}

function getAbilities(rawAbilities, keys){
  let abilityCodes = rawAbilities.map(rawAbility => rawAbility[0])
  let abilityRules = getAbilityRules(abilityCodes)
  return rawAbilities.map((rawAbility, id) => ({
    rule: extractKeys(abilityRules[id], keys), 
    param1: rawAbility[1], 
    param2: rawAbility[2],
  }))
}

function getAbilityRules(abilityCodes){
  let allAbilities = getAllData(dataTypes.ability)
  let abilities = abilityCodes.map(code => allAbilities.find(item => item.code === code))
  return abilities
}

function getRace(code){
  let allRaces = getAllData(dataTypes.race)
  let race = allRaces.find(item => item.code === code)
  return race
}

function getRangedWeapon(code, abilityKeys){
  if (code === "") return null // no weapon - null is necessary for the JSON output done by Next

  let allWeapons = getAllData(dataTypes.weapon)
  let weapon = allWeapons.find(item => item.code === code)
  weapon.abilities = getAbilities(weapon.abilities, abilityKeys)
  return weapon
}

function extractKeys(object, keys){
  let result = keys.reduce((obj, key) => {
    if (object[key] !== undefined){
     obj[key] = object[key]
    }
    return obj
  }, {})
  return result
}

export function getAllData(dataType){
  let rawObj = readJsonFile(join(dataDir, dataFiles[dataType]));
  // version checking would take place here if needed
  
  let data = rawObj.data
  
  // this is where we filter out data that is irrelevant to this app
  if (dataType === dataTypes.creature){
    // filter out creatures with ruleMaturity > 2
    data = data.filter(item => item.ruleMaturity <= 2)
  }

  return data
}

export function getAllItems(dataType, keys){
  let data = getAllData(dataType);

  if (Array.isArray(keys)){
    data = data.map(item => extractKeys(item, keys))
  }
  return data
}

export function getCreature(code){
  const creatureKeys = [
    'code', 
    'name', 
    'types',
    'size',
    'tagline',
    'stamina',
    'abilities',
    'movement',
    'attack',
    'support',
    'save',
    'commandRange',
    'rangedWeapon',
    'race',
    'cost',
    'range',
    'cost_per',
  ];
  const abilityKeys = [
    'code',
    'name',
    'staminaCost',
    'type',
    'rule',
  ]
  const raceKeys = [
    'code',
    'culture',
    'theme',
  ]

  let allCreatures = getAllData(dataTypes.creature)
  let rawDenizen = allCreatures.find(item => item.code === code)
  let denizen = extractKeys(rawDenizen, creatureKeys)
  
  denizen.race = extractKeys(getRace(denizen.race), raceKeys)
  denizen.abilities = getAbilities(denizen.abilities, abilityKeys)
  denizen.rangedWeapon = getRangedWeapon(denizen.rangedWeapon, abilityKeys)

  return denizen
}
