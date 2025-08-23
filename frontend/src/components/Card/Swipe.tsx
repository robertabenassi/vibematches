
import React, { useState } from 'react';
import WowMatch from './WowMatch';
import { Typography, Box, Button, Alert } from '@mui/material';
import InfoBox from './InfoBox';
import StyledCard from './StyledCard';
import OuterBox from './OuterBox';
import { useSwipeable } from 'react-swipeable';
import ImageBox from './ImageBox';
import Actions from './Actions';
import { Profile } from '../../models/Profile';

interface Props {
    profiles: Profile[];
    currentIndex: number;
    loading: boolean;
    onDislike: () => void;
    onLike: () => void;
    setCurrentIndex: (idx: number) => void;
    onRestart: () => void;
    wowEffect?: boolean;
    actionsDisabled?: boolean;
}

const Swipe: React.FC<Props> = ({ profiles, currentIndex, setCurrentIndex, onRestart,  onDislike, onLike, loading, wowEffect, actionsDisabled }) => {
    const profile = profiles[currentIndex];
    const done = profiles.length === 0 || currentIndex >= profiles.length;

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            if (!actionsDisabled) onDislike();
        },
        onSwipedRight: () => {
            if (!actionsDisabled) {
                onLike();
            }
        },
        trackMouse: true,
    });

    const [restarting, setRestarting] = useState(false);

    if (loading) return <></>
    if (done || !profile || restarting) return (
        <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Alert severity="info">No more profiles</Alert>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => {
                onRestart();
                setCurrentIndex(0);
            }}>Restart</Button>
        </Box>
    );

    return (
            <OuterBox {...swipeHandlers}>
            <StyledCard>
                {wowEffect && <WowMatch />}
                <ImageBox src={profile.image} alt={profile.name} />
                <InfoBox>
                    <Typography variant="h5" sx={{ color: '#e75480', fontWeight: 700, letterSpacing: '0.03em' }}>{profile.name}</Typography>
                    <Typography variant="body2" sx={{ mt: 1, mb: 2, color: '#888' }}>Age: {profile.age}</Typography>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', px: 2, mb: 2 }}>
                        <Actions
                            onDislike={onDislike}
                            onLike={onLike}
                            disabled={actionsDisabled}
                            data-testid="swipe-actions"
                        />
                    </Box>
                </InfoBox>
            </StyledCard>
    </OuterBox>
    );
};

export default Swipe;
