/**
 * @jest-environment jsdom
 */

import ReactDOMServer from 'react-dom/server';
import { render } from '@testing-library/react'

// This renders the component inside a container div because of the necessity 
// to use dangerouslySetInnerHTML, so strictly speaking there's an extra DOM 
// element. However it doesn't matter for screen queries.
function TestContainer({ htmlString }){
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
  ) 
}

function renderOnServer(component){
  const html = ReactDOMServer.renderToStaticMarkup(component)
  return render(<TestContainer htmlString={html} />)
}

export {
  renderOnServer,
}