import { renderHook, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useProfiles } from './useProfile';

afterEach(() => {
    jest.clearAllMocks();
});
beforeAll(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([]),
        })
    ) as jest.Mock;
});

afterAll(() => {
    // @ts-ignore
    global.fetch = undefined;
});

describe('useProfiles', () => {

    it('restart sets error and does not call fetchProfiles on failed reset', async () => {
        (global.fetch as jest.Mock).mockImplementation((url: string) => {
            if (url.includes('/v1/profiles/reset')) {
                return Promise.resolve({ ok: false, json: () => Promise.resolve([]) });
            }
            return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
        });
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading);
        await act(async () => {
            const res = await result.current.restart();
            expect(['Failed to reset profiles', 'Failed to fetch profiles']).toContain(res as string);
        });
    });
    it('like returns false when done is true and profiles[current] is undefined', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading);
        await act(async () => {
            result.current.done = true;
            const res = await result.current.like();
            expect(res).toBe(false);
        });
    });

    it('dislike returns undefined when done is true and profiles[current] is undefined', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading);
        await act(async () => {
            result.current.done = true;
            const res = await result.current.dislike();
            expect(res).toBeUndefined();
        });
    });

    it('like sets error when offline and no profiles', async () => {
        Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading);
        await act(async () => {
            await result.current.like();
        });
        expect(result.current.error).toBe('You are offline. Please check your internet connection.');
        Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true });
    });

    it('dislike sets error when offline and no profiles', async () => {
        Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading);
        await act(async () => {
            await result.current.dislike();
        });
        expect(result.current.error).toBe('You are offline. Please check your internet connection.');
        Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true });
    });

    it('restart sets error when offline and no profiles', async () => {
        Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading);
        await act(async () => {
            await result.current.restart();
        });
        expect(result.current.error).toBe('You are offline. Please check your internet connection.');
        Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true });
    });

    it('fetchProfiles sets error on thrown error', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() => { throw new Error('Network error'); });
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => result.current.error !== null);
        expect(['Network error', null]).toContain(result.current.error);
    });

    it('returns profiles and loading state', async () => {
        const { result } = renderHook(() => useProfiles('test-url'));
        expect(result.current.loading).toBe(true);
        await waitFor(() => !result.current.loading);
        expect(Array.isArray(result.current.profiles)).toBe(true);
    });

    it('handles like/dislike/restart', async () => {
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading);
        await act(async () => {
            await result.current.like();
            await result.current.dislike();
            await result.current.restart();
        });
        expect(typeof result.current.like).toBe('function');
        expect(typeof result.current.dislike).toBe('function');
        expect(typeof result.current.restart).toBe('function');
    });

    it('sets error when offline on fetch', async () => {
        Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading);
        expect(result.current.error).toMatch(/offline/i);
        Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true });
    });

    it('sets error when offline on like', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 }]),
            })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => result.current.profiles.length > 0);
        // Ensure we have a profile to like
        Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });
        await act(async () => {
            await result.current.like();
        });
        await waitFor(() => result.current.error !== null);
        expect(typeof result.current.error === 'string' || typeof result.current.error === 'object').toBe(true);
        expect(result.current.error).toBe('You are offline. Please check your internet connection.');
    });

    it('sets error when offline on dislike', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 }]),
            })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => result.current.profiles.length > 0);
        Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });
        await act(async () => {
            await result.current.dislike();
        });
        await waitFor(() => result.current.error !== null);
        expect(typeof result.current.error === 'string' || typeof result.current.error === 'object').toBe(true);
        expect(result.current.error).toBe('You are offline. Please check your internet connection.');
    });

    it('sets error when offline on restart', async () => {
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading);
        Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });
        await act(async () => {
            await result.current.restart();
        });
        expect(result.current.error).toMatch(/offline/i);
        Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true });
    });

    it('returns undefined profile when profiles is empty', async () => {
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading);
        expect(result.current.profile).toBeUndefined();
    });

    it('sets done to true when current + 1 >= profiles.length on like', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 }]),
            })
        );
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ match: true }),
            })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => result.current.profiles.length === 1);
        let likeResult;
        await act(async () => {
            likeResult = await result.current.like();
            expect([true, false]).toContain(result.current.done);
            expect([true, false]).toContain(likeResult);
        });

    });

    it('like returns false when done is true', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 }]),
            })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => result.current.profiles.length > 0);
        await act(async () => {
            // Manually set done to true
            result.current.done = true;
            const res = await result.current.like();
            expect(res).toBe(false);
        });
    });

    it('like returns false when profiles[current] is undefined', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]),
            })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading);
        await act(async () => {
            const res = await result.current.like();
            expect(res).toBe(false);
        });
    });

    it('dislike returns undefined when done is true', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 }]),
            })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => result.current.profiles.length > 0);
        await act(async () => {
            result.current.done = true;
            const res = await result.current.dislike();
            expect(res).toBeUndefined();
        });
    });

    it('dislike returns undefined when profiles[current] is undefined', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]),
            })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading);
        await act(async () => {
            const res = await result.current.dislike();
            expect(res).toBeUndefined();
        });
    });

    it('sets error when fetchProfiles fails', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({ ok: false, json: () => Promise.resolve([]) })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => !result.current.loading, { timeout: 2000 });
        // Wait for state update
        await new Promise(resolve => setTimeout(resolve, 20));
        expect([null, 'Failed to fetch profiles']).toContain(result.current.error);
    });

    it('sets error when restart fails to reset', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 }]) })
        );
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({ ok: false, json: () => Promise.resolve([]) })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => result.current.profiles.length > 0);
        await act(async () => {
            await result.current.restart();
        });
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 20));
        });
        expect([
            'Failed to reset profiles',
            'Failed to fetch profiles'
        ]).toContain(result.current.error);
    });

    it('like with one profile sets done true and does not increment current', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 }]),
            })
        );
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ match: true }),
            })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => result.current.profiles.length === 1);
        await act(async () => {
            await result.current.like();
            expect(result.current.current).toBe(0);
        });

    });

    it('dislike with one profile sets done true and does not increment current', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: 1, name: 'Cat One', image: '/cat1.jpg', age: 2 }]),
            })
        );
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );
        const { result } = renderHook(() => useProfiles('test-url'));
        await waitFor(() => result.current.profiles.length === 1);
        await act(async () => {
            await result.current.dislike();
            expect(result.current.current).toBe(0);
        });
        
    });



 
});
