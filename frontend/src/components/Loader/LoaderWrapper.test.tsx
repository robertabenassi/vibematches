import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoaderWrapper from './LoaderWrapper';

describe('LoaderWrapper', () => {
  it('shows loader when loading', () => {
    render(<LoaderWrapper loading={true} minDuration={800} />);
    expect(screen.getByTestId('paw-loader')).toBeInTheDocument();
  });

  it('does not show loader when not loading', () => {
    render(<LoaderWrapper loading={false} minDuration={800} />);
    expect(screen.queryByTestId('paw-loader')).toBeNull();
  });

  it('shows loader when loading and minDuration is undefined', () => {
    render(<LoaderWrapper loading={true} />);
    expect(screen.getByTestId('paw-loader')).toBeInTheDocument();
  });

  it('does not show loader when not loading and minDuration is undefined', () => {
    render(<LoaderWrapper loading={false} />);
    expect(screen.queryByTestId('paw-loader')).toBeNull();
  });

  it('hides loader after loading becomes false and timer completes', async () => {
    jest.useFakeTimers();
    const { rerender } = render(<LoaderWrapper loading={true} minDuration={100} />);
    expect(screen.getByTestId('paw-loader')).toBeInTheDocument();
    // Wrap state update in act
    await act(async () => {
      rerender(<LoaderWrapper loading={false} minDuration={100} />);
      jest.advanceTimersByTime(100);
      await Promise.resolve();
    });
    expect(screen.queryByTestId('paw-loader')).toBeNull();
    jest.useRealTimers();
  });
});
