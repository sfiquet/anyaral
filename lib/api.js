import fs from 'fs'
import {join} from 'path'

const dataDir = join(process.cwd(), 'data');

function readJsonFile(dataFile){
  let json = fs.readFileSync(dataFile, {encoding: 'utf8'});
  return JSON.parse(json);
}

function getAbilities(rawAbilities){
  let abilityCodes = rawAbilities.map(rawAbility => rawAbility[0])
  let abilityRules = getAbilityRules(abilityCodes)
  return rawAbilities.map((rawAbility, id) => ({
    rule: abilityRules[id], 
    param1: rawAbility[1], 
    param2: rawAbility[2],
  }))
}

export function getAllRaces(){
  let rawObj = readJsonFile(join(dataDir, 'races_list.json'));
  // version checking would take place here if needed
  return rawObj.data;
}

export function getAllCreatures(){
  let rawObj = readJsonFile(join(dataDir, 'creatures_list.json'));
  // version checking would take place here if needed
  return rawObj.data;
}

export function getAllAbilityRules(){
  let rawObj = readJsonFile(join(dataDir, 'abilities_list.json'));
  // version checking would take place here if needed
  return rawObj.data;
}

export function getAllRangedWeapons(){
  let rawObj = readJsonFile(join(dataDir, 'ranged_weapons_list.json'));
  // version checking would take place here if needed
  return rawObj.data;
}

export function getCreature(code){
  let allCreatures = getAllCreatures()
  let denizen = allCreatures.find(item => item.code === code)
  
  denizen.race = getRace(denizen.race)
  denizen.abilities = getAbilities(denizen.abilities)
  denizen.rangedWeapon = getRangedWeapon(denizen.rangedWeapon)

  return denizen
}

export function getRace(code){
  let allRaces = getAllRaces()
  let race = allRaces.find(item => item.code === code)
  return race
}

export function getAbilityRules(abilityCodes){
  let allAbilities = getAllAbilityRules()
  let abilities = abilityCodes.map(code => allAbilities.find(item => item.code === code))
  return abilities
}

export function getRangedWeapon(code){
  if (code === "") return null // no weapon - null is necessary for the JSON output done by Next

  let allWeapons = getAllRangedWeapons()
  let weapon = allWeapons.find(item => item.code === code)
  weapon.abilities = getAbilities(weapon.abilities)
  return weapon
}
