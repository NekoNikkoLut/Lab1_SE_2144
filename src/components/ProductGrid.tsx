import { getFilteredProducts, useCart } from '../context';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

export function ProductGrid() {
  const { state } = useCart();
  const products = getFilteredProducts(state);

  return (
    <section id="shop" aria-labelledby="catalog-title">
      <div className={styles.heading}><h2 id="catalog-title">Browse the collection</h2><span>{products.length} products</span></div>
      {products.length ? <div className={styles.grid}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className={styles.empty}>No products match those filters. Try widening your search.</p>}
    </section>
  );
}
