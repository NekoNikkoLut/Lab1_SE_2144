import { useEffect, useId, useRef, useState } from 'react';
import styles from './Dropdown.module.css';

type DropdownOption = {
  label: string;
  value: string;
};

type DropDownProps = {
  ariaLabelledBy: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
};

export function DropDown({ ariaLabelledBy, options, value, onChange }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', closeOnOutsideClick);
    return () => window.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const selectOption = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer} ref={containerRef}>
      <button
        type="button"
        className={styles.dropdownButton}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={menuId}
        aria-labelledby={ariaLabelledBy}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setIsOpen(false);
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <span>{selectedOption.label}</span>
        <span className={styles.arrow} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu} id={menuId} role="listbox" aria-labelledby={ariaLabelledBy}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={`${styles.dropdownOption} ${option.value === value ? styles.active : ''}`}
              onClick={() => selectOption(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
