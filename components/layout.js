import Meta from './meta'
import Header from './header'
import Footer from './footer'
import styles from '../styles/Home.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Meta />

      <Header />

      <main className={styles.main}>
        {children}
      </main>

      <Footer />
    </div>
  )
}
