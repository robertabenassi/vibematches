import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatchedChatsDrawer from './MatchedChatsDrawer';

describe('MatchedChatsDrawer', () => {
  it('renders drawer', () => {
    render(<MatchedChatsDrawer open={true} onClose={() => {}} matchedProfiles={[]} matchedIds={[]} setMatchedIds={() => {}} />);
    expect(screen.getByTestId('matched-chats-drawer')).toBeInTheDocument();
  });

  it('renders matched profiles in drawer', () => {
    const profiles = [
      { id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 },
      { id: 2, name: 'Cat Two', image: '/cat2.jpg', age: 3 },
    ];
    render(<MatchedChatsDrawer open={true} onClose={() => {}} matchedProfiles={profiles} matchedIds={[1,2]} setMatchedIds={() => {}} />);
    expect(screen.getByText('Cat One')).toBeInTheDocument();
    expect(screen.getByText('Cat Two')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(2);
  });

  it('calls onClose when back button is clicked', () => {
    const handleClose = jest.fn();
    render(<MatchedChatsDrawer open={true} onClose={handleClose} matchedProfiles={[]} matchedIds={[]} setMatchedIds={() => {}} />);
    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders with default matchedIds and setMatchedIds when not provided', () => {
    const profiles = [
      { id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 }
    ];
    render(<MatchedChatsDrawer open={true} onClose={() => {}} matchedProfiles={profiles} />);
    expect(screen.getByText('Cat One')).toBeInTheDocument();
    expect(screen.getByTestId('matched-chats-drawer')).toBeInTheDocument();
  });
});
