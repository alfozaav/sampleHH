import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import ImageList from '../ImageList';
import ImageViewer from '../ImageViewer';
import UploadButton from '../UploadButton';
import MobileImageViewer from '../MobileImageViewer';

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  gap: 16px;
  height: calc(100vh - 100px);
  max-height: 800px;
  overflow: hidden;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: auto;
    max-height: none;
    overflow: visible;
  }
`;

const ListSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  max-height: 100%;
  
  @media (max-width: 768px) {
    height: auto;
    overflow-y: visible;
    order: 1;
  }
`;

const ViewerSection = styled.section`
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  
  @media (max-width: 768px) {
    display: none; /* Hide the regular viewer on mobile */
  }
`;

const MobileUploadSection = styled.section`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    order: 2;
    margin-top: 16px;
    background-color: var(--gray);
    border-radius: 8px;
    padding: 16px;
  }
`;

const DesktopUploadContainer = styled.div`
  grid-column: 1 / -1;
  grid-row: 2;
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile as we're using MobileUploadSection instead */
  }
`;

const ImageGallery: React.FC = () => {
  const [isMobileViewerOpen, setIsMobileViewerOpen] = useState(false);
  const selectedImage = useSelector((state: RootState) => state.images.selectedImage);
  
  // Effect to show mobile viewer when an image is selected
  React.useEffect(() => {
    if (selectedImage && window.innerWidth <= 768) {
      setIsMobileViewerOpen(true);
    }
  }, [selectedImage]);
  
  const handleCloseViewer = () => {
    setIsMobileViewerOpen(false);
  };
  
  return (
    <GalleryContainer>
      <ListSection>
        <ImageList />
      </ListSection>
      
      <ViewerSection>
        <ImageViewer />
      </ViewerSection>
      
      {/* Desktop upload button */}
      <DesktopUploadContainer>
        <UploadButton />
      </DesktopUploadContainer>
      
      {/* Mobile upload button */}
      <MobileUploadSection>
        <UploadButton />
      </MobileUploadSection>
      
      {/* Mobile popup viewer */}
      {isMobileViewerOpen && selectedImage && window.innerWidth <= 768 && (
        <MobileImageViewer onClose={handleCloseViewer} />
      )}
    </GalleryContainer>
  );
};

export default ImageGallery;