import { appName } from '../app.config.js'
import Container from '../components/container'
import Meta from '../components/meta'

import getHtmlFromMarkdownFile from '../lib/markdown'

export default function About({ content }){
  const title = `About ${appName}`
  return (
    <Container>
      <Meta options={{
        title,
        nakedTitle: true,
        // no specific description, use the site default
      }} />
      <main className="space-y-8">
        <h1>{title}</h1>
        <div className="markdown" dangerouslySetInnerHTML={{__html: content}} />
      </main>
    </Container>
  );
}

export async function getStaticProps(){
  let content = getHtmlFromMarkdownFile('about.md')
  return { props: { content } }
}
