import { useState, useEffect, useRef } from 'react';
import { Profile } from '../models/Profile';


export function useProfiles(apiUrl: string) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const errorShownRef = useRef(false);
  const [done, setDone] = useState(false);
  const [current, setCurrent] = useState(0);

  // Helper to fetch profiles from backend
  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!navigator.onLine) {
        throw new Error('You are offline. Please check your internet connection.');
      }
  const res = await fetch(`${apiUrl}/v1/profiles/suggested`);
      if (!res.ok) {
        setError('Failed to fetch profiles');
        setProfiles([]);
        setCurrent(0);
        setDone(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setProfiles(data);
      setCurrent(0);
      setDone(false);
    } catch (e: any) {
      setError(e.message);
      errorShownRef.current = true;
    }
    setLoading(false);
  };

  useEffect(() => {
    errorShownRef.current = false;
    fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  const like = async () => {
  console.log('LIKE:', { profilesLength: profiles.length, current, done, profile: profiles[current] });
    if (!navigator.onLine) {
      setError('You are offline. Please check your internet connection.');
      return false;
    }
    if (done || !profiles[current]) return false;
  const res = await fetch(`${apiUrl}/v1/profiles/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: profiles[current].id })
    });
    const data = await res.json();
    // Set done if this is the last profile
    if (profiles.length === 1 || current + 1 === profiles.length) {
      setDone(true);
      setCurrent(current); // Ensure current doesn't increment past last
    } else {
      setCurrent(c => c + 1);
    }
    return data.match === true;
  };

  const dislike = async () => {
  console.log('DISLIKE:', { profilesLength: profiles.length, current, done, profile: profiles[current] });
    if (!navigator.onLine) {
      setError('You are offline. Please check your internet connection.');
      return;
    }
    if (done || !profiles[current]) return;
  await fetch(`${apiUrl}/v1/profiles/dislike`, { method: 'POST' });
    // Set done if this is the last profile
    if (profiles.length === 1 || current + 1 === profiles.length) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
    }
  };

  // Restart: reset backend and reload profiles
  const restart = async () => {
    setLoading(true);
    setError(null);
    setProfiles([]);
    try {
      if (!navigator.onLine) {
        setError('You are offline. Please check your internet connection.');
        setLoading(false);
        return 'You are offline. Please check your internet connection.';
      }
  const res = await fetch(`${apiUrl}/v1/profiles/reset`, { method: 'POST' });
      if (!res.ok) {
        setError('Failed to reset profiles');
        setLoading(false);
        return 'Failed to reset profiles';
      }
      await fetchProfiles();
      setLoading(false);
      return null;
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      return e.message;
    }
  };

  return {
    profiles,
    current,
    profile: profiles[current],
    loading,
    error,
    done,
    like,
    dislike,
    restart,
  };
}
