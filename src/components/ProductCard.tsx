import { useCart } from '../context';
import type { Product } from '../types';
import styles from './ProductCard.module.css';

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);

export function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={product.image} alt="" />
        {!product.inStock && <span className={styles.soldOut}>Sold out</span>}
      </div>
      <div className={styles.details}>
        <p className={styles.category}>{product.category}</p>
        <h3>{product.name}</h3>
        <div className={styles.footer}>
          <strong>{formatCurrency(product.price)}</strong>
          <button type="button" disabled={!product.inStock} onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}>{product.inStock ? 'Add' : 'Unavailable'}</button>
        </div>
      </div>
    </article>
  );
}
