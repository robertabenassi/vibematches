import styled from '@emotion/styled';
import { Button } from '@mui/material';

const CircleButton = styled(Button)`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  &:hover {
    background: #f5f5f5;
  }
`;

export default CircleButton;
