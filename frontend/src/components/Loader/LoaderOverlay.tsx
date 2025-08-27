import styled from '@emotion/styled';

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255,255,255,0.7);
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LoaderOverlay;
