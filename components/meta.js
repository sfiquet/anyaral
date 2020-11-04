import { appName, appDescription } from '../app.config.js'
import Head from 'next/head'

export default function Meta(){
  return (
    <Head>
      <title>{appName} | {appDescription}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
