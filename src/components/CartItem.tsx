import { useCart } from '../context';
import type { CartItem as CartItemType } from '../types';
import styles from './CartItem.module.css';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);

export function CartItem({ item }: { item: CartItemType }) {
  const { dispatch } = useCart();
  const updateQuantity = (quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity } });

  return (
    <article className={styles.item}>
      <img src={item.image} alt="" />
      <div className={styles.details}>
        <p>{item.category}</p>
        <h3>{item.name}</h3>
        <strong>{formatCurrency(item.price)}</strong>
        <div className={styles.bottom}>
          <div className={styles.quantity}>
            <button
              type="button"
              aria-label={`Decrease ${item.name} quantity`}
              onClick={() => updateQuantity(item.quantity - 1)}
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              type="button"
              aria-label={`Increase ${item.name} quantity`}
              onClick={() => updateQuantity(item.quantity + 1)}
            >
              +
            </button>
          </div>
          <button className={styles.remove} type="button" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}>
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
