import React from "react";
import { Box } from "@mui/material";

const WowMatch: React.FC = () => (
  <Box sx={{
    position: 'absolute',
    inset: 0,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    background: 'rgba(244,143,177,0.22)',
    animation: 'wowPulse 1.5s ease',
    borderRadius: 4,
    boxShadow: '0 0 32px 8px #f48fb144',
  }}>
    <svg width="110" height="110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 12, filter: 'drop-shadow(0 0 12px #f48fb1)' }}>
      <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54l-1.35 1.31z" fill="#e75480" stroke="#c2185b" strokeWidth="0.5" />
    </svg>
    <span style={{
      fontSize: '2.2rem',
      fontWeight: 700,
      color: '#e75480',
      textShadow: '0 0 12px #fff, 0 0 24px #f48fb1',
      fontFamily: 'cursive',
      animation: 'wowText 1.5s ease',
      letterSpacing: '0.04em',
      padding: '0.2em 0.6em',
      borderRadius: '1em',
      background: 'rgba(255,240,246,0.7)',
      boxShadow: '0 2px 16px #f48fb122',
    }}>Purrfect match!</span>
    <style>{`
      @keyframes wowPulse {
        0% { opacity: 0; transform: scale(0.8); }
        40% { opacity: 1; transform: scale(1.08); box-shadow: 0 0 32px 8px #f48fb1; }
        80% { opacity: 1; transform: scale(1.02); }
        100% { opacity: 0; transform: scale(1); }
      }
      @keyframes wowText {
        0% { opacity: 0; transform: scale(0.8); }
        40% { opacity: 1; transform: scale(1.12); }
        80% { opacity: 1; transform: scale(1.02); }
        100% { opacity: 0; transform: scale(1); }
      }
    `}</style>
  </Box>
);

export default WowMatch;
