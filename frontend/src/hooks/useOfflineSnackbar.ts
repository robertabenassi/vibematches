import { useEffect, useState } from 'react';

export function useOfflineSnackbar() {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => {
      setSnackMsg('You are offline. Please check your internet connection.');
      setSnackOpen(true);
      setIsOffline(true);
    };
    const handleOnline = () => {
      setIsOffline(false);
    };
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return { snackOpen, setSnackOpen, snackMsg, setSnackMsg, isOffline };
}
