import { CartProvider, useCart } from './context';
import { CartDrawer, Filters, Header, ProductDetail, ProductGrid, ToastHost } from './components';
import styles from './App.module.css';

function AppContent() {
  const { state } = useCart();
  return (
    <div className={styles.app} id="top">
      <Header />
      <main className={styles.content}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Buy · Sell · Upgrade</p>
          <h1>Pre-loved tech, priced to move.</h1>
          <p>Checked-over gear for work, play, and everything in between.</p>
        </div>
        <div className={styles.shop}>
          <Filters />
          <div className={styles.grid}>
            <ProductGrid />
          </div>
        </div>
      </main>
      <CartDrawer />
      <ToastHost />
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
