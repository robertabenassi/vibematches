import styled from '@emotion/styled';

const StoriesScroll = styled.div<{ dragActive?: boolean }>`
  display: flex;
  overflow-x: auto;
  max-width: 800px;
  width: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  gap: 0;
  cursor: ${props => props.dragActive ? 'grabbing' : 'grab'};
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default StoriesScroll;
