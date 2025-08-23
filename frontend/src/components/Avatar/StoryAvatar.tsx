import styled from '@emotion/styled';

const StoryAvatar = styled.span<{ selected?: boolean; unseen?: boolean }>`
  display: inline-block;
  padding: 4px;
  border-radius: 50%;
  background: #fff;
  box-sizing: border-box;
  border: 2px solid ${props => props.selected ? '#1976d2' : '#f48fb1'};
  img {
    filter: ${props => props.unseen ? 'blur(4px)' : 'none'};
    transition: filter 0.3s;
  }
`;

export default StoryAvatar;
