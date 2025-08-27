import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  onMenuClick: () => void;
  onBellClick: () => void;
  matchedCount: number;
}

const TopBar: React.FC<Props> = ({ onMenuClick, onBellClick, matchedCount }) => (
  <AppBar position="fixed" color="inherit" sx={{ display: { xs: "flex", md: "none" } }}>
    <Toolbar>
  <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick} data-testid="menu-btn">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
        VibeMatches
      </Typography>
      <Box sx={{ position: 'relative', display: 'inline-flex', ml: 1 }}>
        <IconButton color="inherit" aria-label="matched chats" onClick={onBellClick}>
          <NotificationsIcon />
        </IconButton>
        {matchedCount > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 2,
              right: 2,
              background: '#e75480',
              color: '#fff',
              borderRadius: '50%',
              width: 18,
              height: 18,
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              zIndex: 1,
              boxShadow: '0 1px 4px #e7548044',
            }}
          >
            {matchedCount}
          </Box>
        )}
      </Box>
    </Toolbar>
  </AppBar>
);

export default TopBar;
