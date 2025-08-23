import styled from '@emotion/styled';

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 10;
  > *:first-of-type {
    margin-right: auto;
  }
  > *:last-of-type {
    margin-left: auto;
  }
`;

export default ActionsWrapper;
