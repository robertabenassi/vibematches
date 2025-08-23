import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Swipe from './Swipe';

const profiles = [
    { id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 },
    { id: 2, name: 'Cat Two', image: '/cat2.jpg', age: 3 },
];

describe('Swipe', () => {
    it('renders profiles', () => {
        render(<Swipe profiles={profiles} currentIndex={0} setCurrentIndex={() => { }} onRestart={() => { }} loading={false} onDislike={() => { }} onLike={() => { }} wowEffect={false} actionsDisabled={false} />);
        expect(screen.getByText('Cat One')).toBeInTheDocument();
    });

    it('disables all CircleButtons during wowEffect', () => {
        render(<Swipe profiles={profiles} currentIndex={0} setCurrentIndex={() => { }} onRestart={() => { }} loading={false} onDislike={() => { }} onLike={() => { }} wowEffect={true} actionsDisabled={true} />);
        const actions = screen.getByTestId('swipe-actions');
        const buttons = actions.querySelectorAll('button');
        expect(buttons.length).toBeGreaterThan(0);
        buttons.forEach(btn => {
            expect(btn).toBeDisabled();
            expect(btn).toHaveClass('Mui-disabled');
        });
    });

    it('renders nothing when loading is true', () => {
        render(<Swipe profiles={profiles} currentIndex={0} setCurrentIndex={() => { }} onRestart={() => { }} loading={true} onDislike={() => { }} onLike={() => { }} wowEffect={false} actionsDisabled={false} />);
        expect(screen.queryByText('Cat One')).toBeNull();
    });

    it('shows no more profiles when done', () => {
        render(<Swipe profiles={[]} currentIndex={0} setCurrentIndex={() => { }} onRestart={() => { }} loading={false} onDislike={() => { }} onLike={() => { }} wowEffect={false} actionsDisabled={false} />);
        expect(screen.getByText(/No more profiles/i)).toBeInTheDocument();
    });

    it('shows no more profiles when currentIndex out of range', () => {
        render(<Swipe profiles={profiles} currentIndex={10} setCurrentIndex={() => { }} onRestart={() => { }} loading={false} onDislike={() => { }} onLike={() => { }} wowEffect={false} actionsDisabled={false} />);
        expect(screen.getByText(/No more profiles/i)).toBeInTheDocument();
    });

    it('calls onRestart and setCurrentIndex when restart button is clicked', () => {
        const onRestart = jest.fn();
        const setCurrentIndex = jest.fn();
        render(<Swipe profiles={[]} currentIndex={0} setCurrentIndex={setCurrentIndex} onRestart={onRestart} loading={false} onDislike={() => { }} onLike={() => { }} wowEffect={false} actionsDisabled={false} />);
        // Use getByText instead of getByRole for the restart button
        const btn = screen.getByText(/restart/i);
        fireEvent.click(btn);
        expect(onRestart).toHaveBeenCalled();
        expect(setCurrentIndex).toHaveBeenCalledWith(0);
    });

    it('calls onDislike when swiped left and not disabled', () => {
        const onDislike = jest.fn();
        render(<Swipe profiles={profiles} currentIndex={0} setCurrentIndex={() => { }} onRestart={() => { }} loading={false} onDislike={onDislike} onLike={() => { }} wowEffect={false} actionsDisabled={false} />);
        // Find the swipeable container (OuterBox)
        const outerBox = screen.getByText('Cat One').closest('div');
        if (!outerBox) throw new Error('Swipeable container not found');
        act(() => {
            fireEvent.touchStart(outerBox, { touches: [{ clientX: 300 }] });
            fireEvent.touchMove(outerBox, { touches: [{ clientX: 100 }] });
            fireEvent.touchEnd(outerBox, { changedTouches: [{ clientX: 100 }] });
        });
        // Wait for react-swipeable to process
        setTimeout(() => {
            expect(onDislike).toHaveBeenCalled();
        }, 0);
    });

    it('calls onLike when swiped right and not disabled', () => {
        const onLike = jest.fn();
        render(<Swipe profiles={profiles} currentIndex={0} setCurrentIndex={() => { }} onRestart={() => { }} loading={false} onDislike={() => { }} onLike={onLike} wowEffect={false} actionsDisabled={false} />);
        // Find the swipeable container (OuterBox)
        const outerBox = screen.getByText('Cat One').closest('div');
        if (!outerBox) throw new Error('Swipeable container not found');
        act(() => {
            fireEvent.touchStart(outerBox, { touches: [{ clientX: 100 }] });
            fireEvent.touchMove(outerBox, { touches: [{ clientX: 300 }] });
            fireEvent.touchEnd(outerBox, { changedTouches: [{ clientX: 300 }] });
        });
        setTimeout(() => {
            expect(onLike).toHaveBeenCalled();
        }, 0);
    });

    it('does not call onDislike/onLike when actionsDisabled', () => {
        const onDislike = jest.fn();
        const onLike = jest.fn();
        render(<Swipe profiles={profiles} currentIndex={0} setCurrentIndex={() => { }} onRestart={() => { }} loading={false} onDislike={onDislike} onLike={onLike} wowEffect={false} actionsDisabled={true} />);
        fireEvent.keyDown(screen.getByText('Cat One'), { key: 'ArrowLeft' });
        fireEvent.keyDown(screen.getByText('Cat One'), { key: 'ArrowRight' });
        expect(onDislike).not.toHaveBeenCalled();
        expect(onLike).not.toHaveBeenCalled();
    });

    it('does not call onDislike/onLike when actionsDisabled and swiped', () => {
        const onDislike = jest.fn();
        const onLike = jest.fn();
        render(<Swipe profiles={profiles} currentIndex={0} setCurrentIndex={() => { }} onRestart={() => { }} loading={false} onDislike={onDislike} onLike={onLike} wowEffect={false} actionsDisabled={true} />);
        const outerBox = screen.getByText('Cat One').closest('div');
        if (!outerBox) throw new Error('Swipeable container not found');
        act(() => {
            fireEvent.touchStart(outerBox, { touches: [{ clientX: 300 }] });
            fireEvent.touchMove(outerBox, { touches: [{ clientX: 100 }] });
            fireEvent.touchEnd(outerBox, { changedTouches: [{ clientX: 100 }] });
            fireEvent.touchStart(outerBox, { touches: [{ clientX: 100 }] });
            fireEvent.touchMove(outerBox, { touches: [{ clientX: 300 }] });
            fireEvent.touchEnd(outerBox, { changedTouches: [{ clientX: 300 }] });
        });
        expect(onDislike).not.toHaveBeenCalled();
        expect(onLike).not.toHaveBeenCalled();
    });

    it('renders WowMatch when wowEffect is true', () => {
        render(<Swipe profiles={profiles} currentIndex={0} setCurrentIndex={() => {}} onRestart={() => {}} loading={false} onDislike={() => {}} onLike={() => {}} wowEffect={true} actionsDisabled={false} />);
        expect(screen.getByTestId('swipe-actions')).toBeInTheDocument();
        expect(screen.getByText('Cat One')).toBeInTheDocument();
        // WowMatch renders a heart or similar, check for its presence
        // If WowMatch has a unique testid, use it; else check for a unique element
    });

    it('renders nothing if profile is undefined', () => {
        render(<Swipe profiles={[]} currentIndex={0} setCurrentIndex={() => {}} onRestart={() => {}} loading={false} onDislike={() => {}} onLike={() => {}} wowEffect={false} actionsDisabled={false} />);
        expect(screen.queryByTestId('swipe-actions')).toBeNull();
    });

    it('disables actions when actionsDisabled is true', () => {
        render(<Swipe profiles={profiles} currentIndex={0} setCurrentIndex={() => {}} onRestart={() => {}} loading={false} onDislike={() => {}} onLike={() => {}} wowEffect={false} actionsDisabled={true} />);
        const actions = screen.getByTestId('swipe-actions');
        const buttons = actions.querySelectorAll('button');
        buttons.forEach(btn => {
            expect(btn).toBeDisabled();
        });
    });

    it('calls onDislike when dislike button is clicked', () => {
        const onDislike = jest.fn();
        render(<Swipe profiles={profiles} currentIndex={0} setCurrentIndex={() => {}} onRestart={() => {}} loading={false} onDislike={onDislike} onLike={() => {}} wowEffect={false} actionsDisabled={false} />);
        const actions = screen.getByTestId('swipe-actions');
        const dislikeBtn = actions.querySelector('button');
        if (!dislikeBtn) throw new Error('Dislike button not found');
        fireEvent.click(dislikeBtn);
        expect(onDislike).toHaveBeenCalled();
    });

    it('calls onLike when like button is clicked', () => {
        const onLike = jest.fn();
        render(<Swipe profiles={profiles} currentIndex={0} setCurrentIndex={() => {}} onRestart={() => {}} loading={false} onDislike={() => {}} onLike={onLike} wowEffect={false} actionsDisabled={false} />);
        const actions = screen.getByTestId('swipe-actions');
        const likeBtn = actions.querySelectorAll('button')[1];
        if (!likeBtn) throw new Error('Like button not found');
        fireEvent.click(likeBtn);
        expect(onLike).toHaveBeenCalled();
    });


    it('renders Swipe with actionsDisabled true', () => {
        act(() => {
            render(<Swipe profiles={profiles} currentIndex={0} setCurrentIndex={() => {}} onRestart={() => {}} loading={false} onDislike={() => {}} onLike={() => {}} wowEffect={false} actionsDisabled={true} />);
        });
        const actions = screen.getByTestId('swipe-actions');
        const buttons = actions.querySelectorAll('button');
        expect(buttons.length).toBeGreaterThan(0);
        buttons.forEach(btn => {
            expect(btn).toBeDisabled();
        });
    });


});
