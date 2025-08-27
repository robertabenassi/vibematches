import React from 'react';
import PawLoader from './PawLoader';
import LoaderOverlay from './LoaderOverlay';

interface LoaderWrapperProps {
  loading: boolean;
  minDuration?: number;
}

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({ loading, minDuration }) => {
  const [showLoader, setShowLoader] = React.useState(false);
  const [timerDone, setTimerDone] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    // Always clear any previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (loading) {
      setShowLoader(true);
      setTimerDone(false);
      if (minDuration !== undefined) {
        timerRef.current = setTimeout(() => setTimerDone(true), minDuration);
      } else {
        setTimerDone(true);
      }
      return;
    }

    // Not loading
    if (timerDone) {
      setShowLoader(false);
      return;
    }

    if (minDuration !== undefined) {
      timerRef.current = setTimeout(() => setTimerDone(true), minDuration);
    } else {
      setTimerDone(true);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [loading, minDuration, timerDone]);

  if (showLoader) {
    return (
      <LoaderOverlay>
        <PawLoader />
      </LoaderOverlay>
    );
  }
  return <></>;
};

export default LoaderWrapper;
