import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LikedSidebar from './LikedSidebar';

describe('LikedSidebar', () => {
    it('renders sidebar with heading and empty state', () => {
        render(<LikedSidebar matchedProfiles={[]} setMatchedIds={() => { }} matchedIds={[]} />);
        // Check for sidebar heading
        const headings = screen.queryAllByText(/Matched Profiles/i);
        expect(headings.length).toBeGreaterThan(0);
        // Check for empty state message
        expect(screen.getByText(/No matched profiles yet/i)).toBeInTheDocument();
    });

    it('renders at least one matched profile', () => {
        const profiles = [
            { id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 },
        ];
        render(<LikedSidebar matchedProfiles={profiles} setMatchedIds={() => { }} matchedIds={[1]} />);
        expect(screen.getByText('Cat One')).toBeInTheDocument();
        const matchedElements = screen.getAllByText(/matched/i);
        expect(matchedElements.length).toBeGreaterThan(0);
    });

    it('shows and closes snackbar when chat icon is clicked', async () => {
        const profiles = [
            { id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 },
        ];
        render(<LikedSidebar matchedProfiles={profiles} setMatchedIds={() => { }} matchedIds={[1]} />);
        // Click chat icon
        const chatButton = screen.getByLabelText('chat');
        fireEvent.click(chatButton);
        // Snackbar should appear
        expect(screen.getByText(/Available only on Pro Subscription/i)).toBeInTheDocument();
        // Close snackbar
        fireEvent.click(screen.getByRole('button', { name: /close/i }));
        // Snackbar should disappear
        await waitFor(() => {
            expect(screen.queryByText(/Available only on Pro Subscription/i)).toBeNull();
        });
        // Ensure sidebar is still rendered after snackbar closes
        expect(screen.getAllByText(/matched/i).length).toBeGreaterThan(0);
    });

    it('renders a divider between matched profiles except after the last one', () => {
        const profiles = [
            { id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 },
            { id: 2, name: 'Cat Two', image: '/cat2.jpg', age: 3 },
            { id: 3, name: 'Cat Three', image: '/cat3.jpg', age: 4 },
        ];
        render(<LikedSidebar matchedProfiles={profiles} setMatchedIds={() => { }} matchedIds={[1, 2, 3]} />);
        // Should render 2 dividers for 3 profiles
        expect(screen.getAllByRole('separator').length).toBe(2);
    });

    it('renders dividers between matched profiles except after the last one', () => {
        const profiles = [
            { id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 },
            { id: 2, name: 'Cat Two', image: '/cat2.jpg', age: 3 },
            { id: 3, name: 'Cat Three', image: '/cat3.jpg', age: 4 },
        ];
        render(<LikedSidebar matchedProfiles={profiles} setMatchedIds={() => {}} matchedIds={[1,2,3]} />);
        // Should render 2 dividers for 3 profiles
        expect(screen.getAllByRole('separator').length).toBe(2);
    });
});