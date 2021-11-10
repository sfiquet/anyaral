import Meta from './meta'
import Header from './header'
import Footer from './footer'

export default function Layout({ updateOptions, children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Meta />
      <Header updateOptions={updateOptions} />
      {children}
      <Footer />
    </div>
  )
}
