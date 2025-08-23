import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopBar from './TopBar';

describe('TopBar', () => {
  it('renders matched count', () => {
    render(<TopBar onMenuClick={() => {}} onBellClick={() => {}} matchedCount={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onMenuClick', () => {
    const onMenuClick = jest.fn();
    render(<TopBar onMenuClick={onMenuClick} onBellClick={() => {}} matchedCount={0} />);
    fireEvent.click(screen.getByTestId('menu-btn'));
    expect(onMenuClick).toHaveBeenCalled();
  });
  it('calls onBellClick', () => {
    const onBellClick = jest.fn();
    render(<TopBar onMenuClick={() => {}} onBellClick={onBellClick} matchedCount={2} />);
    fireEvent.click(screen.getByLabelText('matched chats'));
    expect(onBellClick).toHaveBeenCalled();
  });

  it('does not render matched count when matchedCount is 0', () => {
    render(<TopBar onMenuClick={() => {}} onBellClick={() => {}} matchedCount={0} />);
    // Should not find the badge
    expect(screen.queryByText('0')).toBeNull();
  });
});
