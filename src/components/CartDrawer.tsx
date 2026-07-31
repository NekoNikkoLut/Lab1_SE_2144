import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { getCartGrandTotal, getCartItemCount, useCart, useToast } from '../context';
import { CartItem } from './CartItem';
import styles from './CartDrawer.module.css';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);

export function CartDrawer() {
  const { state, dispatch } = useCart();
  const notify = useToast();
  const itemCount = getCartItemCount(state);
  const close = () => dispatch({ type: 'TOGGLE_CART', payload: false });

  useEffect(() => {
    if (!state.isCartOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const previousOverflow = document.body.style.overflow;

    window.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isCartOpen]);

  return (
    <div
      className={`${styles.overlay} ${state.isCartOpen ? styles.open : ''}`}
      onMouseDown={close}
      aria-hidden={!state.isCartOpen}
    >
      <aside
        className={styles.drawer}
        aria-label="Shopping cart"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div>
            <p>Your cart</p>
            <h2>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </h2>
          </div>
          <button className={styles.close} type="button" aria-label="Close cart" onClick={close}>
            <FiX aria-hidden="true" />
          </button>
        </div>

        <div className={styles.items}>
          {state.cart.length ? (
            state.cart.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p className={styles.empty}>
              Your cart is empty. Go grab something you've had your eye on.
            </p>
          )}
        </div>

        {state.cart.length > 0 && (
          <div className={styles.summary}>
            <div className={styles.subtotalRow}>
              <span>Subtotal</span>
              <strong>{formatCurrency(getCartGrandTotal(state))}</strong>
            </div>
            <p>Taxes and shipping are calculated at checkout.</p>
            <button
              className={styles.checkout}
              type="button"
              onClick={() => {
                dispatch({ type: 'CHECKOUT' });
                notify('Order placed — your gear is now marked sold out!');
                close();
              }}
            >
              Checkout
            </button>
            <button
              className={styles.clear}
              type="button"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
