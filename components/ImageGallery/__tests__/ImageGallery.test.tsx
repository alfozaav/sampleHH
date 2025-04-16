import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ImageGallery from '@/components/ImageGallery';

// Mock the components used by ImageGallery
jest.mock('@/components/ImageList', () => {
  return function MockImageList() {
    return <div data-testid="mock-image-list">ImageList Component</div>;
  };
});

jest.mock('@/components/ImageViewer', () => {
  return function MockImageViewer() {
    return <div data-testid="mock-image-viewer">ImageViewer Component</div>;
  };
});

jest.mock('@/components/UploadButton', () => {
  return function MockUploadButton() {
    return <div>UploadButton Component</div>;
  };
});

jest.mock('@/components/MobileImageViewer', () => {
  return function MockMobileImageViewer({ onClose }: { onClose: () => void }) {
    return <div data-testid="mock-mobile-viewer">MobileImageViewer Component</div>;
  };
});

// Create mock for window.innerWidth
const originalInnerWidth = window.innerWidth;

describe('ImageGallery', () => {
  const mockStore = configureStore([]);
  
  // Reset window.innerWidth after each test
  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth
    });
  });

  it('renders desktop layout correctly', () => {
    // Mock desktop screen size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    });

    const initialState = {
      images: {
        items: [],
        selectedImage: null,
        status: 'idle',
        error: null
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <ImageGallery />
      </Provider>
    );
    
    // Check if main components are rendered
    expect(screen.getByTestId('mock-image-list')).toBeInTheDocument();
    expect(screen.getByTestId('mock-image-viewer')).toBeInTheDocument();
    
    // Use getAllByText to find the UploadButton components
    const uploadButtons = screen.getAllByText('UploadButton Component');
    expect(uploadButtons.length).toBe(2); // There should be 2 upload buttons
    
    // MobileImageViewer should not be rendered when no image is selected
    expect(screen.queryByTestId('mock-mobile-viewer')).not.toBeInTheDocument();
  });

  it('renders mobile layout correctly with no selected image', () => {
    // Mock mobile screen size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767
    });

    const initialState = {
      images: {
        items: [],
        selectedImage: null,
        status: 'idle',
        error: null
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <ImageGallery />
      </Provider>
    );
    
    // Check if ImageList is rendered
    expect(screen.getByTestId('mock-image-list')).toBeInTheDocument();
    
    // Check if upload buttons are rendered (just verify they exist, not how many)
    expect(screen.getAllByText('UploadButton Component').length).toBeGreaterThan(0);
    
    // MobileImageViewer should not be rendered when no image is selected
    expect(screen.queryByTestId('mock-mobile-viewer')).not.toBeInTheDocument();
  });

  it('renders mobile viewer when image is selected on mobile', () => {
    // Mock mobile screen size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767
    });

    const selectedImage = { 
      id: '1', 
      url: '/images/1.jpg',
      author: 'Test Author',
      width: 800,
      height: 600
    };
    const initialState = {
      images: {
        items: [selectedImage],
        selectedImage: selectedImage,
        status: 'idle',
        error: null
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <ImageGallery />
      </Provider>
    );
    
    // MobileImageViewer should be rendered when an image is selected on mobile
    expect(screen.getByTestId('mock-mobile-viewer')).toBeInTheDocument();
  });
});