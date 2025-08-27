import React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';

interface SidebarDrawerProps {
  open: boolean;
  onClose: () => void;
}

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
  width: 100%;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 0;
  font-size: 0.98rem;
  color: #333;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 8px;
  &:hover {
    background: #ffe4ef;
    color: #e75480;
  }
`;

const Title = styled.h1`
  font-size: 1.6rem;
  color: #111;
  margin: 0;
  letter-spacing: 1px;
`;

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ open, onClose }) => (
  <Drawer anchor="left" open={open} onClose={onClose}>
    <div style={{ width: 220, height: '100vh', display: 'flex', flexDirection: 'column', padding: '16px 12px 0 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <IconButton edge="start" color="inherit" aria-label="back" onClick={onClose} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Title style={{ fontSize: '1.2rem', margin: 0 }}>VibeMatches</Title>
      </div>
      <Menu>
        <MenuItem>
          <HomeIcon sx={{ color: '#e75480' }} /> Home
        </MenuItem>
        <Divider sx={{ width: '100%', my: 1 }} />
        <MenuItem>
          <PersonIcon sx={{ color: '#e75480' }} /> Profile
        </MenuItem>
      </Menu>
    </div>
  </Drawer>
);

export default SidebarDrawer;
