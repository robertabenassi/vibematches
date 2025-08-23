import React from 'react';
import ActionsWrapper from './ActionsWrapper';
import CircleButton from './CircleButton';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface BubbleActionsProps {
  onDislike?: () => void;
  onLike?: () => void;
  disabled?: boolean;
}

const BubbleActions: React.FC<BubbleActionsProps> = ({ onDislike, onLike, disabled, ...rest }) => (
  <ActionsWrapper {...rest}>
    <CircleButton color="error" onClick={onDislike} sx={{ ml: 0 }} disabled={disabled}>
      <CloseIcon fontSize="large" />
    </CircleButton>
    <div style={{ flex: 1 }} />
    <CircleButton color="primary" onClick={onLike} sx={{ mr: 0 }} disabled={disabled}>
      <FavoriteIcon fontSize="large" />
    </CircleButton>
  </ActionsWrapper>
);

export default BubbleActions;
