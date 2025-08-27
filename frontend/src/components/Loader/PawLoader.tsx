import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const heartbeat = keyframes`
  0% { transform: scale(1); }
  20% { transform: scale(1.15); }
  40% { transform: scale(1); }
  60% { transform: scale(1.15); }
  80% { transform: scale(1); }
  100% { transform: scale(1); }
`;

const PawSvg = styled.svg`
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto;
  animation: ${heartbeat} 1s infinite;
  transform-origin: center center;
`;

const PAW_COLOR = '#f48fb1';
const TOE_COLOR = '#f8bbd0';

const PawLoader: React.FC = () => (
  <PawSvg data-testid="paw-loader" viewBox="0 0 100 100">
    {/* Main pad: rounded oval */}
    <ellipse cx="50" cy="70" rx="22" ry="18" fill={PAW_COLOR} stroke="#e573a7" strokeWidth="2" />
  {/* Toe pads: three circles */}
  <circle cx="26" cy="38" r="8" fill={TOE_COLOR} stroke="#e573a7" strokeWidth="1.5" />
  <circle cx="40" cy="25" r="8" fill={TOE_COLOR} stroke="#e573a7" strokeWidth="1.5" />
  <circle cx="60" cy="25" r="8" fill={TOE_COLOR} stroke="#e573a7" strokeWidth="1.5" />
  <circle cx="74" cy="38" r="8" fill={TOE_COLOR} stroke="#e573a7" strokeWidth="1.5" />
    {/* Heart inside the main pad */}
    <path
      d="M50 70
         C48 66, 44 66, 44 70
         C44 74, 50 78, 50 78
         C50 78, 56 74, 56 70
         C56 66, 52 66, 50 70
         Z"
      fill="#fff"
      opacity="0.8"
    />
  </PawSvg>
);

export default PawLoader;
