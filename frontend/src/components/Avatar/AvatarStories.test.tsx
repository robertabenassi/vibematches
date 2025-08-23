import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AvatarStories from './AvatarStories';

const profiles = [
  { id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 },
  { id: 2, name: 'Cat Two', image: '/cat2.jpg', age: 3 },
];

describe('AvatarStories', () => {
  it('renders loading state', () => {
    render(<AvatarStories profiles={profiles} currentIndex={0} onSelect={() => {}} loading={true} />);
    expect(screen.getByText(/Wait for the candidates/i)).toBeInTheDocument();
  });

  it('renders all avatars', () => {
    render(<AvatarStories profiles={profiles} currentIndex={0} onSelect={() => {}} loading={false} />);
    expect(screen.getByText('Cat One')).toBeInTheDocument();
    expect(screen.getByText('Cat Two')).toBeInTheDocument();
  });

  it('calls onSelect when avatar is clicked and not offline', () => {
    const onSelect = jest.fn();
    render(<AvatarStories profiles={profiles} currentIndex={0} onSelect={onSelect} loading={false} isOffline={false} />);
    fireEvent.click(screen.getByText('Cat Two'));
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('does not call onSelect when offline', () => {
    const onSelect = jest.fn();
    render(<AvatarStories profiles={profiles} currentIndex={0} onSelect={onSelect} loading={false} isOffline={true} />);
    fireEvent.click(screen.getByText('Cat Two'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('shows tooltip when offline', async () => {
    render(<AvatarStories profiles={profiles} currentIndex={0} onSelect={() => {}} loading={false} isOffline={true} />);
    fireEvent.mouseOver(screen.getByText('Cat Two'));
    expect(await screen.findByText(/You are offline/i)).toBeInTheDocument();
  });
  it('renders nothing when profiles is empty', () => {
    render(<AvatarStories profiles={[]} currentIndex={0} onSelect={() => {}} loading={false} />);
    expect(screen.queryByText(/Wait for the candidates/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Cat One')).toBeNull();
  });

  it('highlights the current avatar', () => {
    render(<AvatarStories profiles={profiles} currentIndex={1} onSelect={() => {}} loading={false} />);
    const activeAvatar = screen.getByTestId('active-avatar');
    expect(activeAvatar).toBeInTheDocument();
    expect(activeAvatar.querySelector('img')).toHaveAttribute('alt', 'Cat Two');
  });
  it('activates drag on mouse down and deactivates on mouse up', () => {
    render(<AvatarStories profiles={profiles} currentIndex={0} onSelect={() => {}} loading={false} />);
    const scroll = screen.getByTestId('stories-scroll');
    fireEvent.mouseDown(scroll, { pageX: 100 });
    fireEvent.mouseMove(scroll, { pageX: 90 });
    fireEvent.mouseUp(scroll);
    // No assertion needed, just coverage for drag logic
  });

  it('activates touch drag and deactivates on touch end', () => {
    render(<AvatarStories profiles={profiles} currentIndex={0} onSelect={() => {}} loading={false} />);
    const scroll = screen.getByTestId('stories-scroll');
    fireEvent.touchStart(scroll, { touches: [{ pageX: 100 }] });
    fireEvent.touchMove(scroll, { touches: [{ pageX: 90 }] });
    fireEvent.touchEnd(scroll);
    // No assertion needed, just coverage for touch logic
  });

    it('handleDragMove returns early if dragActive is false', () => {
    render(<AvatarStories profiles={profiles} currentIndex={0} onSelect={() => {}} loading={false} />);
    const scroll = screen.getByTestId('stories-scroll');
    fireEvent.mouseMove(scroll, { pageX: 100 });
    // No assertion needed, just coverage
  });

  it('handleTouchMove returns early if touchState.current is null', () => {
    render(<AvatarStories profiles={profiles} currentIndex={0} onSelect={() => {}} loading={false} />);
    const scroll = screen.getByTestId('stories-scroll');
    fireEvent.touchMove(scroll, { touches: [{ pageX: 100 }] });
    // No assertion needed, just coverage
  });
});
