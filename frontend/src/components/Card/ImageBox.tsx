import React from 'react';
import styled from '@emotion/styled';



const StyledBox = styled.div`
  width: 100%;
  height: 320px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
  @media (max-width: 800px) {
    height: 60vh;
    min-height: 0;
    overflow: hidden;
    position: relative;
  }
  @media (min-width: 801px) {
    height: 320px;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;



interface Props {
  src: string;
  alt: string;
}


const CatImageBox: React.FC<Props> = ({ src, alt }) => {
  return (
    <StyledBox>
      <StyledImg src={src} alt={alt} draggable={false} />
    </StyledBox>
  );
};

export default CatImageBox;
