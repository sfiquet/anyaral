import Document, { Html, Head, Main, NextScript } from 'next/document'

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