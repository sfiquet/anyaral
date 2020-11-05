export function formatRace(race){
  return race.culture === '' ? race.theme : `${race.culture} – ${race.theme}`
}
