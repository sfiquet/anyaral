import { dataTypes, getAllData, getCreature } from '../../lib/data'
import Container from '../../components/container'
import Denizen, { DenizenHead } from '../../components/denizen'

export default function DenizenPage({ denizen }){
  return (
    <Container>
      <main>
        <DenizenHead denizen={denizen} />
        <Denizen denizen={denizen} />
      </main>
    </Container>
  )
}

export async function getStaticProps({ params }){
  let denizen = getCreature(params.denizen);
  return { props: { denizen } }
}

export async function getStaticPaths(){
  let denizens = getAllData(dataTypes.creature);
  
  let paths = denizens.map(denizen => ({
    params: { denizen: denizen.code }
  }))

  return { paths, fallback: false }
}
