import { useMemo, useState } from 'react';
import { FiSliders, FiX } from 'react-icons/fi';
import { useCart } from '../context';
import type { SortBy } from '../types';
import { DropDown } from './DropDown';
import styles from './Filters.module.css';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount);

export function Filters() {
  const { state, dispatch } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const categories = useMemo(
    () =>
      [...new Set(state.products.map((product) => product.category))].sort().map((category) => ({
        category,
        count: state.products.filter((product) => product.category === category).length,
      })),
    [state.products],
  );

  const maxCatalogPrice = Math.ceil(Math.max(...state.products.map((product) => product.price)) / 10) * 10;
  const sortOptions = [
    { label: 'Featured', value: 'default' },
    { label: 'Price: low to high', value: 'price-asc' },
    { label: 'Price: high to low', value: 'price-desc' },
    { label: 'Name: A to Z', value: 'title-asc' },
  ];

  const setCategory = (category: string) => dispatch({ type: 'SET_CATEGORY', payload: category });

  return (
    <aside className={styles.filters} aria-label="Product filters">
      <button
        className={styles.toggle}
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <FiX aria-hidden="true" /> : <FiSliders aria-hidden="true" />}
        Filters
      </button>

      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}>
        <fieldset className={styles.group}>
          <legend className={styles.heading}>Category</legend>
          <div className={styles.radioGroup} role="group" aria-label="Category">
            <label className={styles.option}>
              <input
                type="radio"
                name="category"
                value=""
                checked={state.filters.category === ''}
                onChange={() => setCategory('')}
              />
              <span className={styles.optionLabel}>All gear</span>
              <span className={styles.optionCount}>{state.products.length}</span>
            </label>
            {categories.map(({ category, count }) => (
              <label key={category} className={styles.option}>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={state.filters.category === category}
                  onChange={() => setCategory(category)}
                />
                <span className={styles.optionLabel}>{category}</span>
                <span className={styles.optionCount}>{count}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.group}>
          <div className={styles.priceHeader}>
            <h3 className={styles.heading}>Max price</h3>
            <span className={styles.priceValue}>{formatCurrency(state.filters.maxPrice)}</span>
          </div>
          <input
            className={styles.range}
            type="range"
            min="0"
            max={maxCatalogPrice}
            step="10"
            value={state.filters.maxPrice}
            aria-label="Maximum price"
            onChange={(event) => dispatch({ type: 'SET_MAX_PRICE', payload: Number(event.target.value) })}
          />
          <div className={styles.rangeEnds}>
            <span>₱0</span>
            <span>{formatCurrency(maxCatalogPrice)}</span>
          </div>
        </div>

        <div className={styles.group}>
          <h3 className={styles.heading} id="sort-label">Sort by</h3>
          <DropDown
            ariaLabelledBy="sort-label"
            options={sortOptions}
            value={state.filters.sortBy}
            onChange={(value) => dispatch({ type: 'SET_SORT', payload: value as SortBy })}
          />
        </div>
      </div>
    </aside>
  );
}
