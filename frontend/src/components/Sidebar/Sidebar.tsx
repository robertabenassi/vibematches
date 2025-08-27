import React from 'react';
import styled from '@emotion/styled';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SidebarContainer = styled.div`
  width: 220px;
  height: 100vh;
  min-height: 0;
  background: #fff;
  box-shadow: 2px 0 12px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px 12px 0 12px;
  flex: 0 0 auto;

  @media (max-width: 800px) {
    width: 100vw;
    height: 100vh;
    min-width: 0;
    align-items: stretch;
    padding: 16px 0 0 0;
    box-shadow: none;
  }
`;

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

const Sidebar: React.FC = () => (
  <SidebarContainer>
    <Title>VibeMatches</Title>
    <Menu>
      <MenuItem>
        <HomeIcon sx={{ color: '#e75480' }} /> Home
      </MenuItem>
      <Divider sx={{ width: '100%', my: 1 }} />
      <MenuItem>
        <PersonIcon sx={{ color: '#e75480' }} /> Profile
      </MenuItem>
    </Menu>
  </SidebarContainer>
);

export default Sidebar;
