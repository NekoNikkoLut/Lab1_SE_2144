import { FiSearch, FiShoppingCart, FiX } from 'react-icons/fi';
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
          <span>GearHub</span>
        </a>

        <div className={styles.searchWrap}>
          <FiSearch className={styles.searchIcon} aria-hidden="true" />
          <input
            className={styles.search}
            type="search"
            placeholder="Search by brand or gadget..."
            aria-label="Search products"
            value={state.filters.searchQuery}
            onChange={(event) => dispatch({ type: 'SET_SEARCH_QUERY', payload: event.target.value })}
          />
          {state.filters.searchQuery && (
            <button
              className={styles.searchClear}
              type="button"
              aria-label="Clear search"
              onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: '' })}
            >
              <FiX aria-hidden="true" />
            </button>
          )}
        </div>

        <button
          className={styles.cartButton}
          type="button"
          aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          onClick={() => dispatch({ type: 'TOGGLE_CART', payload: true })}
        >
          <FiShoppingCart aria-hidden="true" size={20} />
          {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
        </button>
      </div>
    </header>
  );
}
