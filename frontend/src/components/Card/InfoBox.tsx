import Box from '@mui/material/Box';
import styled from '@emotion/styled';

const InfoBox = styled(Box)`
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 2;
  box-shadow: 0 -2px 16px #f48fb122;
  padding-top: 16px;
  @media (min-width: 801px) {
    position: static;
    box-shadow: none;
  }
`;

export default InfoBox;
