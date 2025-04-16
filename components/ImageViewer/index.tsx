import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '../../lib/redux/store';
import { clearSelectedImage } from '../../lib/redux/features/imagesSlice';

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow: hidden;
  position: relative;
  height: calc(100% - 70px); /* Account for footer height */
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%; /* Will be constrained by parent */
  object-fit: contain;
  border-radius: 4px;
  width: auto;
  height: auto;
`;

const NoImageMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #777;
  font-size: 18px;
`;

const ImageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const AuthorName = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: var(--purple);
  margin: 0;
`;

const StyledClearButton = styled.button`
  padding: 10px 20px;
  background-color: var(--purple);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  transition: background-color 0.2s, transform 0.1s;
  
  &:hover {
    background-color: #4a517a;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ViewerTitle = styled.h2`
  font-size: 34px;
  font-weight: bold;
  color: var(--orange);
  margin: 0;
  padding: 16px;
  text-align: center;
`;

const ImageViewer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedImage = useSelector((state: RootState) => state.images.selectedImage);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleClear = () => {
    dispatch(clearSelectedImage());
  };
  
  return (
    <ViewerContainer>
      {selectedImage ? (
        <>
          <ViewerTitle>Image Viewer</ViewerTitle>
          <ImageContainer ref={containerRef}>
            <StyledImage 
              src={selectedImage.url} 
              alt={`Selected image ${selectedImage.id}`} 
            />
          </ImageContainer>
          <ImageFooter>
            <AuthorName>{selectedImage.author}</AuthorName>
            <StyledClearButton onClick={handleClear}>
              Clear selection
            </StyledClearButton>
          </ImageFooter>
        </>
      ) : (
        <NoImageMessage>
          Select an image to view
        </NoImageMessage>
      )}
    </ViewerContainer>
  );
};

export default ImageViewer;