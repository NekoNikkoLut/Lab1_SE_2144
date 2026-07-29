import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the GearHub storefront', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /gearhub home/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /upgrade your everyday setup/i })).toBeInTheDocument();
  expect(screen.getByRole('region', { name: /product filters/i })).toBeInTheDocument();
});
