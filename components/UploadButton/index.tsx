import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addLocalImage } from '../../lib/redux/features/imagesSlice';
import { AppDispatch } from '../../lib/redux/store';

const UploadButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    justify-content: center;
    margin: 0;
  }
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: var(--orange);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c9a840;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 24px;
    font-size: 16px;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const image = {
          id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          url: e.target?.result as string,
          author: 'Local Upload',
          width: 0,
          height: 0,
          isLocal: true
        };
        
        dispatch(addLocalImage(image));
      };
      
      reader.readAsDataURL(file);
    });
    
    // Reset the input so the same file can be selected again
    event.target.value = '';
  };
  
  return (
    <UploadButtonContainer>
      <StyledButton onClick={handleClick}>
        Upload an Image
      </StyledButton>
      <HiddenInput 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*"
        multiple
      />
    </UploadButtonContainer>
  );
};

export default UploadButton;