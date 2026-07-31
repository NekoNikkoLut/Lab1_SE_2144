import { useCart, useToast } from '../context';
import type { Product } from '../types';
import styles from './ProductCard.module.css';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);

export function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const notify = useToast();
  return (
    <article className={styles.card} onClick={() => dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product })}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={product.image} alt="" loading="lazy" />
        <span className={`${styles.status} ${product.inStock ? '' : styles.soldOut}`}>
          {product.inStock ? 'Available' : 'Sold out'}
        </span>
      </div>
      <div className={styles.details}>
        <p className={styles.category}>{product.category}</p>
        <h3>{product.name}</h3>
        <div className={styles.footer}>
          <span className={styles.price}>{formatCurrency(product.price)}</span>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={(event) => {
              event.stopPropagation();
              dispatch({ type: 'ADD_TO_CART', payload: product });
              notify(`${product.name} added to cart!`);
            }}
          >
            {product.inStock ? 'Add to cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  );
}
