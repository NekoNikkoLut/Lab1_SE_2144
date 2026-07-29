import { CartProvider } from './context';
import { CartDrawer, Filters, Header, ProductGrid } from './components';
import styles from './App.module.css';

function App() {
  return (
    <CartProvider>
      <div className={styles.app}>
        <Header />
        <main className={styles.content}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Thoughtful tech, everyday ease</p>
            <h1>Upgrade your everyday setup.</h1>
            <p>Explore reliable essentials for work, play, and everything in between.</p>
          </div>
          <Filters />
          <ProductGrid />
        </main>
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
