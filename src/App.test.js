import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

test('renders Pande Cup navigation', () => {
  render(<App />);
  
  // Tunatumia getAllByText kwa sababu neno linaonekana mara mbili (Desktop & Mobile)
  const linkElements = screen.getAllByText(/Wadhamini/i);
  
  // Tunahakikisha kuwa tumepata angalau element moja
  expect(linkElements.length).toBeGreaterThan(0);
});