import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the GearHub project title', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /gearhub/i })).toBeInTheDocument();
});
