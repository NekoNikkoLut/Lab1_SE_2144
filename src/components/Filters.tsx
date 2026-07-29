import { useMemo } from 'react';
import { useCart } from '../context';
import type { SortBy } from '../types';
import { DropDown } from './DropDown';
import styles from './Filters.module.css';

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount);

export function Filters() {
  const { state, dispatch } = useCart();
  const categories = useMemo(() => [...new Set(state.products.map((product) => product.category))].sort(), [state.products]);
  const maxCatalogPrice = Math.ceil(Math.max(...state.products.map((product) => product.price)) / 10) * 10;
  const categoryOptions = [{ label: 'All categories', value: '' }, ...categories.map((category) => ({ label: category, value: category }))];
  const sortOptions = [
    { label: 'Featured', value: 'default' },
    { label: 'Price: low to high', value: 'price-asc' },
    { label: 'Price: high to low', value: 'price-desc' },
    { label: 'Name: A to Z', value: 'title-asc' },
  ];

  return (
    <section className={styles.filters} aria-label="Product filters">
      <label className={styles.search}>
        <span className={styles.label}>Search products</span>
        <input placeholder="Search the catalog" value={state.filters.searchQuery} onChange={(event) => dispatch({ type: 'SET_SEARCH_QUERY', payload: event.target.value })} />
      </label>
      <div className={styles.selectField}>
        <span className={styles.label} id="category-label">Category</span>
        <DropDown ariaLabelledBy="category-label" options={categoryOptions} value={state.filters.category} onChange={(value) => dispatch({ type: 'SET_CATEGORY', payload: value })} />
      </div>
      <div className={styles.selectField}>
        <span className={styles.label} id="sort-label">Sort by</span>
        <DropDown ariaLabelledBy="sort-label" options={sortOptions} value={state.filters.sortBy} onChange={(value) => dispatch({ type: 'SET_SORT', payload: value as SortBy })} />
      </div>
      <label className={styles.price}>
        <span className={styles.label}>Up to {formatCurrency(state.filters.maxPrice)}</span>
        <input type="range" min="0" max={maxCatalogPrice} step="10" value={state.filters.maxPrice} onChange={(event) => dispatch({ type: 'SET_MAX_PRICE', payload: Number(event.target.value) })} />
      </label>
    </section>
  );
}
