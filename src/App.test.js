import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "Good Afternoon" text', () => {
  render(<App />);
  const headingElement = screen.getByText(/Good Afternoon/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders the Add Task button', () => {
  render(<App />);
  const addButton = screen.getByText(/Add Task/i);
  expect(addButton).toBeInTheDocument();
});
