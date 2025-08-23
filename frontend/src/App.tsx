import { useEffect, useState, useRef } from "react";
import { useProfiles } from "./hooks/useProfile";
import { Alert, Box, Snackbar } from "@mui/material";
import AvatarStories from "./components/Avatar/AvatarStories";
import Swipe from "./components/Card/Swipe";
import LoaderWrapper from "./components/Loader/LoaderWrapper";
import Sidebar from "./components/Sidebar/Sidebar";
import TopBar from "./components/TopBar/TopBar";
import MatchedChatsDrawer from "./components/Sidebar/MatchedChatsDrawer";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import MatchedSidebar from "./components/Sidebar/LikedSidebar";
import { useOfflineSnackbar } from "./hooks/useOfflineSnackbar";
import { getViteApiUrl } from './env';

const API_URL = getViteApiUrl();

function App() {
  const [chatsDrawerOpen, setChatsDrawerOpen] = useState(false);
  const {
    snackOpen,
    setSnackOpen,
    snackMsg,
    setSnackMsg,
    isOffline,
  } = useOfflineSnackbar();

  // Handle dislike action
  const handleDislike = async () => {
    if (wowEffect) return;
    const profile = visibleProfiles[currentIndex];
    if (!profile) return;
    try {
      await dislike();
      const updatedSeen = [...seenIds, profile.id];
      setSeenIds(updatedSeen);
      // Advance index after dislike
      const newVisible = profiles.filter(p => !updatedSeen.includes(p.id));
      let nextIndex = 0;
      if (newVisible.length > 0) {
        nextIndex = Math.min(currentIndex, newVisible.length - 1);
      }
      setCurrentIndex(nextIndex);
    } catch (e) {
      let msg = "An error occurred while disliking profile.";
      if (typeof e === "string") msg = e;
      else if (e && typeof e === "object" && "message" in e) msg = (e as any).message;
      setSnackMsg(msg);
      setSnackOpen(true);
    }
  };

  // Handle restart action
  const handleRestart = () => {
    setResetting(true);
    setTimeout(() => {
      setSeenIds([]);
      setMatchedIds([]);
      setCurrentIndex(0);
      setResetting(false);
      restart();
    }, 800);
  };
  // Utility to trigger wow effect and await its completion
  const triggerWowEffect = () => {
    setWowEffect(true);
    return new Promise<void>(resolve => {
      if (wowTimerRef.current) clearTimeout(wowTimerRef.current);
      wowTimerRef.current = setTimeout(() => {
        setWowEffect(false);
        resolve();
      }, 1500);
    });
  };
  const {
    profiles,
    loading,
    error,
    restart,
    dislike,
    like,
  } = useProfiles(API_URL);

  const wowTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [seenIds, setSeenIds] = useState<number[]>([]);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [wowEffect, setWowEffect] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:800px)");
  const [resetting, setResetting] = useState(false);
  
  const visibleProfiles = profiles.filter(p => !seenIds.includes(p.id));
  const matchedProfiles = profiles.filter(p => matchedIds.includes(p.id));

  const handleLike = async () => {
    if (wowEffect) return false; // Block actions during wow effect
    const profile = visibleProfiles[currentIndex];
    if (!profile || matchedIds.includes(profile.id)) return false;
    try {
      const isMatch = await like();
      const updatedSeen = [...seenIds, profile.id];
      const updatedMatched = isMatch ? [...matchedIds, profile.id] : matchedIds;

      setMatchedIds(updatedMatched);
      if (isMatch) {
        await triggerWowEffect();
        setSeenIds(updatedSeen);
        // Recalculate visible profiles and next index after wow effect
        const newVisible = profiles.filter(p => !updatedSeen.includes(p.id));
        let nextIndex = 0;
        if (newVisible.length > 0) {
          nextIndex = Math.min(currentIndex, newVisible.length - 1);
        }
        setCurrentIndex(nextIndex);
      } else {
        setSeenIds(updatedSeen);
        // For non-match, advance index immediately
        const newVisible = profiles.filter(p => !updatedSeen.includes(p.id));
        let nextIndex = 0;
        if (newVisible.length > 0) {
          nextIndex = Math.min(currentIndex, newVisible.length - 1);
        }
        setCurrentIndex(nextIndex);
      }
      return true;
    } catch (e) {
      let msg = "An error occurred while liking profile.";
      if (typeof e === "string") msg = e;
      else if (e && typeof e === "object" && "message" in e) msg = (e as any).message;
      setSnackMsg(msg);
      setSnackOpen(true);
      return false;
    }
  };


  // Restart profiles when coming back online
  useEffect(() => {
    const handleOnline = () => {
      if (error) {
        restart();
      }
    };
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [error, restart]);


  return (
    <Box sx={{ minHeight: "100vh", background: "#fff0f6" }}>
      {isMobile ? (
        <>
          <TopBar
            onMenuClick={() => setDrawerOpen(true)}
            onBellClick={() => setChatsDrawerOpen(true)}
            matchedCount={matchedProfiles.length}
          />
          <MatchedChatsDrawer
            open={chatsDrawerOpen}
            onClose={() => setChatsDrawerOpen(false)}
            matchedProfiles={matchedProfiles}
            matchedIds={matchedIds}
            setMatchedIds={setMatchedIds}
          />
          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: '100vw', height: '100vh', pt: 8 }}>
              <Sidebar />
            </Box>
          </Drawer>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", pt: 8, maxWidth: 500, mx: "auto", gap: 1 }}>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {visibleProfiles.length > 0 && (
                  <Box sx={{ mb: 1 }}>
                    <AvatarStories
                      profiles={visibleProfiles}
                      currentIndex={currentIndex}
                      onSelect={setCurrentIndex}
                      loading={loading}
                      isOffline={isOffline}
                    />
                  </Box>
                )}
                <LoaderWrapper loading={resetting || loading} minDuration={800} />
                <Swipe
                  profiles={visibleProfiles}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  onRestart={handleRestart}
                  loading={loading}
                  onDislike={handleDislike}
                  onLike={handleLike}
                  wowEffect={wowEffect}
                  actionsDisabled={wowEffect}
                />
              </>
            )}
          </Box>
        </>
      ) : (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar />
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", pt: 0, maxWidth: 500, mx: "auto", gap: 1 }}>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {visibleProfiles.length > 0 && (
                  <Box sx={{ mb: 1 }}>
                    <AvatarStories
                      profiles={visibleProfiles}
                      currentIndex={currentIndex}
                      onSelect={setCurrentIndex}
                      loading={loading}
                      isOffline={isOffline}
                    />
                  </Box>
                )}
                <LoaderWrapper loading={resetting || loading} minDuration={800} />
                <Swipe
                  profiles={visibleProfiles}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  onRestart={handleRestart}
                  loading={loading}
                  onDislike={handleDislike}
                  onLike={handleLike}
                  wowEffect={wowEffect}
                  actionsDisabled={wowEffect}
                />
              </>
            )}
          </Box>
          <MatchedSidebar matchedProfiles={matchedProfiles} setMatchedIds={setMatchedIds} matchedIds={matchedIds} />
        </Box>
      )}
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setSnackOpen(false)} sx={{ bgcolor: '#ffe4ef', color: '#e75480' }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
