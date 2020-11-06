import Meta from './meta'
import Header from './header'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
        <Meta />

        <Header />

        <div className="flex-grow py-32px">
          {children}
        </div>

        <Footer />
    </div>
  )
}
