import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchImages } from '../../lib/redux/features/imagesSlice';
import { RootState, AppDispatch } from '../../lib/redux/store';
import ImageItem from '../ImageItem';
import { ThreeDots } from 'react-loader-spinner';

const ListContainer = styled.div`
  background-color: var(--gray);
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
  box-sizing: border-box;
  width: 344px; /* 320px (image width) + 24px (container padding) */
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    max-height: 340px; /* Height for the row in mobile view */
  }
`;

const StyledImageList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 8px 0;
  flex: 1;
  box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  
  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 8px;
    align-items: center;
    justify-content: flex-start;
    
    /* Custom scrollbar for horizontal */
    &::-webkit-scrollbar {
      height: 6px;
      width: auto;
    }
  }
`;

const SpinnerContainer = styled.div`
  display: flex;  
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: var(--gray);
`

const ImageList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, status, error } = useSelector((state: RootState) => state.images);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchImages());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <ListContainer>
      <SpinnerContainer>
        <ThreeDots
            height={80}       
            width={80}
            color="#5D6384"
            radius={9}
            ariaLabel="loading"
        />
      </SpinnerContainer>
    </ListContainer>;
  }

  if (status === 'failed') {
    return <ListContainer><div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>Error: {error}</div></ListContainer>;
  }

  return (
    <ListContainer>
      <StyledImageList>
        {images.map((image) => (
          <ImageItem key={image.id} image={image} />
        ))}
      </StyledImageList>
    </ListContainer>
  );
};

export default ImageList;