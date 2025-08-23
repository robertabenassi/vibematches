import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

jest.mock('./env', () => ({
    ...jest.requireActual('./env.jest'),
    getViteApiUrl: jest.fn(() => 'test-url'),
}));

jest.mock('./hooks/useProfile', () => ({
    useProfiles: () => ({
        profiles: [
            { id: 1, name: 'Alice', avatar: 'a.jpg' },
            { id: 2, name: 'Bob', avatar: 'b.jpg' }
        ],
        loading: false,
        error: '',
        restart: jest.fn(),
        dislike: jest.fn(),
        like: jest.fn(() => true),
    })
}));

jest.mock('./hooks/useOfflineSnackbar', () => ({
    useOfflineSnackbar: () => ({
        snackOpen: false,
        setSnackOpen: jest.fn(),
        snackMsg: '',
        setSnackMsg: jest.fn(),
        isOffline: false,
    })
}));

jest.mock('@mui/material/useMediaQuery', () => () => true);

beforeAll(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([]),
        })
    ) as jest.Mock;
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('App', () => {
    it('renders sidebar and topbar', async () => {
        await act(async () => {
            render(<App />);
        });
        expect(screen.getByText(/VibeMatches/i)).toBeInTheDocument();
    });


    it('opens drawer when menu button clicked', async () => {
        await act(async () => {
            render(<App />);
        });
        const menuBtn = screen.getByTestId('menu-btn');
        userEvent.click(menuBtn);
    });
});
