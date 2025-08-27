import { Card } from '@mui/material';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
  width: 100%;
  text-align: center;
  box-shadow: 0 8px 32px rgba(244,143,177,0.18);
  border-radius: 4px;
  max-width: 500px;
  position: relative;
  overflow: hidden;
  background: #fff;
  border: 1.5px solid #f48fb1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media (min-width: 801px) {
    height: auto;
  }
`;

export default StyledCard;
