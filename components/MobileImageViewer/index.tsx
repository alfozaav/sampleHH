import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '../../lib/redux/store';
import { clearSelectedImage } from '../../lib/redux/features/imagesSlice';

interface MobileImageViewerProps {
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  z-index: 1001;
`;

const ViewerTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: var(--orange);
  margin: 0;
  padding: 16px;
  text-align: center;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow: hidden;
  background-color: #f5f5f5;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 50vh;
  object-fit: contain;
  border-radius: 4px;
`;

const ImageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f5f5f5;
`;

const AuthorName = styled.h2`
  font-size: 24px;
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
`;

const MobileImageViewer: React.FC<MobileImageViewerProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedImage = useSelector((state: RootState) => state.images.selectedImage);
  
  if (!selectedImage) return null;
  
  const handleClear = () => {
    dispatch(clearSelectedImage());
    onClose();
  };
  
  return (
    <Overlay onClick={onClose}>
      <ViewerContainer onClick={(e) => e.stopPropagation()}>
        <ViewerTitle>Image Viewer</ViewerTitle>
        <ImageContainer>
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
      </ViewerContainer>
    </Overlay>
  );
};

export default MobileImageViewer;