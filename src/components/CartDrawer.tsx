import { getCartGrandTotal, getCartItemCount, useCart } from '../context';
import { CartItem } from './CartItem';
import styles from './CartDrawer.module.css';

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);

export function CartDrawer() {
  const { state, dispatch } = useCart();
  if (!state.isCartOpen) return null;
  const itemCount = getCartItemCount(state);
  const close = () => dispatch({ type: 'TOGGLE_CART', payload: false });
  return (
    <div className={styles.overlay} onMouseDown={close} role="presentation">
      <aside className={styles.drawer} aria-label="Shopping cart" onMouseDown={(event) => event.stopPropagation()}>
        <div className={styles.header}><div><p>YOUR CART</p><h2>{itemCount} {itemCount === 1 ? 'item' : 'items'}</h2></div><button type="button" aria-label="Close cart" onClick={close}>×</button></div>
        <div className={styles.items}>{state.cart.length ? state.cart.map((item) => <CartItem key={item.id} item={item} />) : <p className={styles.empty}>Your cart is waiting for something good.</p>}</div>
        {state.cart.length > 0 && <div className={styles.summary}><div><span>Subtotal</span><strong>{formatCurrency(getCartGrandTotal(state))}</strong></div><p>Taxes and shipping are calculated at checkout.</p><button className={styles.checkout} type="button">Checkout</button><button className={styles.clear} type="button" onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear cart</button></div>}
      </aside>
    </div>
  );
}
