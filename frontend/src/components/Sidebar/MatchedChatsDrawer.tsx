import React from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MatchedSidebar from "./LikedSidebar";

interface Props {
  open: boolean;
  onClose: () => void;
  matchedProfiles: any[];
  matchedIds?: number[];
  setMatchedIds?: any;
}

const MatchedChatsDrawer: React.FC<Props> = ({ open, onClose, matchedProfiles, matchedIds, setMatchedIds }) => (
  <Drawer anchor="top" open={open} onClose={onClose} data-testid="matched-chats-drawer">
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pb: 0 }}>
      <IconButton edge="start" color="inherit" aria-label="back" onClick={onClose} sx={{ mr: 1 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Your latest VibeMatches
      </Typography>
    </Box>
    <Box sx={{ width: { xs: '100%', md: '100vw' }, maxWidth: '100%', px: 0 }}>
      <MatchedSidebar matchedProfiles={matchedProfiles} matchedIds={matchedIds || []} setMatchedIds={setMatchedIds || (() => {})} />
    </Box>
  </Drawer>
);

export default MatchedChatsDrawer;
