import fs from 'fs'
import {join} from 'path'

const dataDir = join(process.cwd(), 'data');

function readJsonFile(dataFile){
  let json = fs.readFileSync(dataFile, {encoding: 'utf8'});
  return JSON.parse(json);
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