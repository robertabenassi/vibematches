import Box from '@mui/material/Box';
import styled from '@emotion/styled';

const OuterBox = styled(Box)`
  margin-top: 0;
  display: flex;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #fff0f6 0%, #f8fafc 100%);
  border-radius: 4px;
  box-shadow: 0 4px 24px #f48fb122;
  padding: 0 16px;
  min-height: 100vh;
  align-items: stretch;
  @media (min-width: 900px) {
    margin-top: 64px;
    padding: 32px 16px;
    min-height: auto;
  }
`;

export default OuterBox;
