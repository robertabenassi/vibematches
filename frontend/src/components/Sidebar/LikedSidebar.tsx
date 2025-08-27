import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Profile } from '../../models/Profile';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Divider, Snackbar, Alert } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';


interface MatchedSidebarProps {
  matchedProfiles: Profile[];
  matchedIds: number[];
  setMatchedIds: Dispatch<SetStateAction<number[]>>;
}

const loaderColor = '#f48fb1';

const MatchedSidebar: React.FC<MatchedSidebarProps> = ({ matchedProfiles, matchedIds, setMatchedIds }) => {
  const [snackOpen, setSnackOpen] = React.useState(false);
  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSnackOpen(true);
  };
  const handleSnackClose = () => setSnackOpen(false);


  return (
  <Box sx={{ width: { xs: '100%', md: 220 }, height: '100vh', background: '#fff', boxShadow: { xs: 'none', md: '-2px 0 12px rgba(0,0,0,0.04)' }, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', pt: 4, px: { xs: 1, md: 3 } }}>
      <Typography
        variant="h6"
        sx={{ color: '#111', mb: 3, display: { xs: 'none', md: 'block' } }}
      >
        Matched Profiles
      </Typography>
      <List sx={{ width: '100%' }}>
        {matchedProfiles.length === 0 ? (
          <ListItem>
            <ListItemText primary={<span style={{ color: '#aaa', fontStyle: 'italic' }}>No matched profiles yet.</span>} />
          </ListItem>
        ) : (
          matchedProfiles.map((profile, idx) => [
            <ListItem key={profile.id} secondaryAction={
              <Box>
                <IconButton edge="end" aria-label="chat" sx={{ p: 0, ml: 0, mr: 0.5 }} onClick={handleChatClick}>
                  <ForumIcon sx={{ color: loaderColor, fontSize: 16 }} />
                </IconButton>
              </Box>
            } sx={{ py: 1.2, minHeight: 40, px: 0.2, alignItems: 'center' }}>
              <ListItemAvatar>
                <Avatar src={profile.image} alt={profile.name} sx={{ width: 35, height: 35, }} />
              </ListItemAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#222', lineHeight: 1, mb: 0 }}>{profile.name}</Typography>
                <Typography variant="caption" sx={{ color: '#888', lineHeight: 1 }}>{profile.age} yrs</Typography>
              </Box>
            </ListItem>,
            idx < matchedProfiles.length - 1 && <Divider key={profile.id + '-divider'} sx={{ mx: 0 }} />
          ])
        )}
      </List>
      <Snackbar open={snackOpen} autoHideDuration={2500} onClose={handleSnackClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="info" onClose={handleSnackClose}>
          Available only on Pro Subscription
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MatchedSidebar;
