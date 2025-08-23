import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('renders sidebar', () => {
    render(<Sidebar />);
    // Find at least one element with text matching /VibeMatches/i
    const matches = screen.queryAllByText(/VibeMatches/i);
    expect(matches.length).toBeGreaterThan(0);
  });
});
