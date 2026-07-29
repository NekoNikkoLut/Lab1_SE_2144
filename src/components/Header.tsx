import { useCart, getCartItemCount } from '../context';
import GearHubLogo from './GearHubLogo';
import styles from './Header.module.css';

export function Header() {
  const { state, dispatch } = useCart();
  const itemCount = getCartItemCount(state);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label="GearHub home">
          <GearHubLogo size={24} className={styles.mark} />
          GearHub
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
        </nav>
        <button className={styles.cartButton} type="button" onClick={() => dispatch({ type: 'TOGGLE_CART', payload: true })}>
          <span aria-hidden="true">Bag</span>
          <span>Cart</span>
          {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
        </button>
      </div>
    </header>
  );
}
