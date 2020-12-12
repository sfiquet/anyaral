import { appName, tagline, description } from '../app.config.js'
import Head from 'next/head'

export default function Meta({ options }){
  let title = `${appName} | ${tagline}`
  let desc = description

  if (options){
    if (options.title){
      title = options.nakedTitle ? options.title : `${options.title} | ${appName}`
    }
    
    if (options.description){
      desc = options.description
    }
  }

  return (
    <Head>
      <title>{ title }</title>
      <meta name="description" content={ desc } />
    </Head>
  );
};
