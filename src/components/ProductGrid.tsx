import { getFilteredProducts, useCart } from '../context';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

export function ProductGrid() {
  const { state } = useCart();
  const products = getFilteredProducts(state);

  return (
    <section id="shop" aria-labelledby="catalog-title">
      <div className={styles.heading}>
        <h2 id="catalog-title">Catalog</h2>
        <span className={styles.count}>{products.length} {products.length === 1 ? 'item' : 'items'}</span>
      </div>
      {products.length ? (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No gear matches those filters. Widen the price or pick another category.</p>
      )}
    </section>
  );
}
