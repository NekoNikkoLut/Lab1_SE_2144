import { CartProvider, useCart } from './context';
import { CartDrawer, Filters, Header, ProductDetail, ProductGrid } from './components';
import styles from './App.module.css';

function AppContent() {
  const { state } = useCart();
  return (
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
      {state.selectedProduct && <ProductDetail product={state.selectedProduct} />}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
