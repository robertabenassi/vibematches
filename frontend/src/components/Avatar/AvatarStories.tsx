import React from "react";
import Tooltip from '@mui/material/Tooltip';
import StoriesContainer from './StoriesContainer';
import StoriesScroll from './StoriesScroll';
import StoryItem from './StoryItem';
import StoryAvatar from './StoryAvatar';
import StoryName from './StoryName';
import { Profile } from "../../models/Profile";

interface Props {
  profiles: Profile[];
  currentIndex: number;
  onSelect: (idx: number) => void;
  loading: boolean;
  isOffline?: boolean;
}

const AvatarStories: React.FC<Props> = ({ profiles, currentIndex, onSelect, loading, isOffline }) => {
  if (loading) return <StoriesContainer style={{ textAlign: 'center' }}>Wait for the candidates...</StoriesContainer>;
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [dragActive, setDragActive] = React.useState(false);
  const dragState = React.useRef<{ startX: number; scrollLeft: number } | null>(null);

  // Track seen profiles
  const [seen, setSeen] = React.useState<Set<number>>(new Set([profiles[0]?.id]));
  React.useEffect(() => {
    if (profiles[currentIndex]) {
      setSeen(prev => {
        const next = new Set(prev);
        next.add(profiles[currentIndex].id);
        return next;
      });
    }
  }, [currentIndex, profiles]);

  // Mouse drag handlers
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragActive(true);
    dragState.current = {
      startX: e.pageX - (scrollRef.current?.offsetLeft || 0),
      scrollLeft: scrollRef.current?.scrollLeft || 0
    };
  };
  const handleDragEnd = () => {
    setDragActive(false);
    dragState.current = null;
  };
  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragActive || !dragState.current || !scrollRef.current) return;
    const x = e.pageX - (scrollRef.current.offsetLeft);
    const walk = dragState.current.startX - x;
    scrollRef.current.scrollLeft = dragState.current.scrollLeft + walk;
  };

  // Touch drag handlers
  const touchState = React.useRef<{ startX: number; scrollLeft: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchState.current = {
      startX: e.touches[0].pageX,
      scrollLeft: scrollRef.current?.scrollLeft || 0
    };
  };
  const handleTouchEnd = () => {
    touchState.current = null;
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchState.current || !scrollRef.current) return;
    const x = e.touches[0].pageX;
    const walk = touchState.current.startX - x;
    scrollRef.current.scrollLeft = touchState.current.scrollLeft + walk;
  };

  return (
    <StoriesContainer>
      <StoriesScroll
        ref={scrollRef}
        dragActive={dragActive}
        tabIndex={0}
        data-testid="stories-scroll"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onMouseMove={handleDragMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {profiles.map((profile, idx) => (
          isOffline ? (
            <Tooltip key={profile.id} title="You are offline. Please check your internet connection." placement="top" arrow>
              <span>
                <StoryItem
                  ref={(el: HTMLDivElement | null) => { itemRefs.current[idx] = el; }}
                  style={{ pointerEvents: 'none', opacity: 0.5, cursor: 'not-allowed', display: 'inline-block' }}
                >
                  <StoryAvatar selected={idx === currentIndex} unseen={!seen.has(profile.id)}>
                    <img
                      src={profile.image}
                      alt={profile.name}
                      draggable={false}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </StoryAvatar>
                  <StoryName>{profile.name}</StoryName>
                </StoryItem>
              </span>
            </Tooltip>
          ) : (
            <StoryItem
              key={profile.id}
              ref={(el: HTMLDivElement | null) => { itemRefs.current[idx] = el; }}
              onClick={() => onSelect(idx)}
            >
              <StoryAvatar selected={idx === currentIndex} unseen={!seen.has(profile.id)} data-testid={idx === currentIndex ? 'active-avatar' : undefined}>
                <img
                  src={profile.image}
                  alt={profile.name}
                  draggable={false}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </StoryAvatar>
              <StoryName>{profile.name}</StoryName>
            </StoryItem>
          )
        ))}
      </StoriesScroll>
    </StoriesContainer>
  )
};

export default AvatarStories;
