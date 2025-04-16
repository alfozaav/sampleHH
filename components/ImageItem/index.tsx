import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectImage } from '../../lib/redux/features/imagesSlice';
import { RootState, AppDispatch } from '../../lib/redux/store';
import { ImageType } from '../../types';

interface ImageItemProps {
  image: ImageType;
}

const StyledImageItem = styled.div<{ $isSelected: boolean }>`
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: #4A5173;
  width: 320px;
  height: 320px;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 16px;
  box-shadow: ${(props) => props.$isSelected ? '0 0 0 3px #3498db, 0 4px 8px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.2)'};
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: ${(props) => props.$isSelected ? '0 0 0 3px #3498db, 0 6px 12px rgba(0,0,0,0.4)' : '0 4px 8px rgba(0,0,0,0.3)'};
  }
  
  @media (max-width: 768px) {
    width: 240px;
    height: 240px;
    margin-bottom: 0;
    margin-right: 16px;
    flex-shrink: 0;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 4px;
  
  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ImageItem: React.FC<ImageItemProps> = ({ image }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedImageId = useSelector((state: RootState) => state.images.selectedImage?.id);
  
  const handleClick = () => {
    dispatch(selectImage(image));
  };
  
  return (
    <StyledImageItem 
      onClick={handleClick} 
      $isSelected={selectedImageId === image.id}
    >
      <ImageWrapper>
        <StyledImage src={image.url} alt={`Image ${image.id}`} loading="lazy" />
      </ImageWrapper>
    </StyledImageItem>
  );
};

export default ImageItem;