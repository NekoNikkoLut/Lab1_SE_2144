import { useState } from 'react';
import { useCart, useToast } from '../context';
import type { Product } from '../types';
import styles from './ProductDetail.module.css';

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);

export function ProductDetail({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const notify = useToast();
  const allImages = [product.image, ...(product.images ?? [])];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.backdrop} onClick={() => dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null })}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={() => dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null })} aria-label="Close">&times;</button>

        <div className={styles.body}>
          <div className={styles.gallery}>
            <img className={styles.mainImage} src={allImages[activeIndex]} alt={product.name} />
            {allImages.length > 1 && (
              <div className={styles.thumbs}>
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${i === activeIndex ? styles.thumbActive : ''}`}
                    onClick={() => setActiveIndex(i)}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.info}>
            <p className={styles.category}>{product.category}</p>
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.price}>{formatCurrency(product.price)}</p>

            {product.description && (
              <div className={styles.description}>
                {product.description.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}

            <button
              className={styles.addBtn}
              disabled={!product.inStock}
              onClick={() => {
                dispatch({ type: 'ADD_TO_CART', payload: product });
                dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null });
                notify(`${product.name} added to cart!`);
              }}
            >
              {product.inStock ? 'Add to cart' : 'Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
