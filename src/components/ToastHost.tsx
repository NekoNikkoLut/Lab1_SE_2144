import { useEffect } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';
import { useCart } from '../context';
import type { Toast } from '../types';
import styles from './ToastHost.module.css';

const TOAST_DURATION_MS = 3200;

function ToastRow({ toast }: { toast: Toast }) {
  const { dispatch } = useCart();
  const dismiss = () => dispatch({ type: 'REMOVE_TOAST', payload: toast.id });

  useEffect(() => {
    const timer = window.setTimeout(dismiss, TOAST_DURATION_MS);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast.id]);

  return (
    <div className={styles.toast} role="status">
      <FiCheckCircle className={styles.icon} aria-hidden="true" />
      <span className={styles.message}>{toast.message}</span>
      <button className={styles.dismiss} type="button" aria-label="Dismiss notification" onClick={dismiss}>
        <FiX aria-hidden="true" />
      </button>
    </div>
  );
}

export function ToastHost() {
  const { state } = useCart();

  if (!state.toasts.length) return null;

  return (
    <div className={styles.region} aria-live="polite">
      {state.toasts.map((toast) => (
        <ToastRow key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
