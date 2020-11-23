import { getAllCreatures, getCreature } from '../../lib/api'
import Layout from '../../components/layout'
import Container from '../../components/container'
import Denizen from '../../components/denizen'

export default function DenizenPage({ denizen }){
  return (
    <Layout>
      <Container>
        <main>
          <Denizen denizen={denizen} />
        </main>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }){
  let denizen = getCreature(params.denizen);
  return { props: { denizen } }
}

export async function getStaticPaths(){
  let denizens = getAllCreatures();
  
  let paths = denizens.map(denizen => ({
    params: { denizen: denizen.code }
  }))

  return { paths, fallback: false }
}
