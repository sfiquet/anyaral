import Document, { Html, Head, Main, NextScript } from 'next/document'
import { appName } from '../app.config.js'

const swapClassScript = `
  let html = document.querySelector('.nojs');
  html.classList.remove('nojs');
  html.classList.add('js');
`;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html className="nojs" lang="en">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: swapClassScript }} />
          <meta name='application-name' content={appName} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={appName} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#FFFFFF' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument