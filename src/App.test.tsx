import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the GearHub storefront', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /gearhub home/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /pre-loved tech, priced to move/i })).toBeInTheDocument();
  expect(screen.getByRole('complementary', { name: /product filters/i })).toBeInTheDocument();
  expect(screen.getByRole('searchbox', { name: /search products/i })).toBeInTheDocument();
});
