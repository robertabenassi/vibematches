import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SidebarDrawer from './SidebarDrawer';
import '@testing-library/jest-dom';

describe('SidebarDrawer', () => {
  it('renders when open is true', () => {
    render(<SidebarDrawer open={true} onClose={() => {}} />);
    expect(screen.getByText('VibeMatches')).toBeInTheDocument();
    expect(screen.getByLabelText('back')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(<SidebarDrawer open={false} onClose={() => {}} />);
    // Drawer content should not be visible
    expect(screen.queryByText('VibeMatches')).not.toBeInTheDocument();
  });

  it('calls onClose when back button is clicked', () => {
    const onClose = jest.fn();
    render(<SidebarDrawer open={true} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('back'));
    expect(onClose).toHaveBeenCalled();
  });
});
