import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MobileImageViewer from '@/components/MobileImageViewer';
import { clearSelectedImage } from '@/lib/redux/features/imagesSlice';

const mockStore = configureStore([]);

describe('MobileImageViewer', () => {
  const mockImage = {
    id: '123',
    url: '/test-image.jpg',
    author: 'Test Author',
    width: 800,
    height: 600
  };
  
  it('renders nothing when no image is selected', () => {
    const initialState = {
      images: {
        selectedImage: null
      }
    };
    
    const store = mockStore(initialState);
    const mockOnClose = jest.fn();
    
    const { container } = render(
      <Provider store={store}>
        <MobileImageViewer onClose={mockOnClose} />
      </Provider>
    );
    
    // The component should return null, so the container should be empty
    expect(container.firstChild).toBeNull();
  });
  
  it('displays selected image in overlay when an image is selected', () => {
    const initialState = {
      images: {
        selectedImage: mockImage
      }
    };
    
    const store = mockStore(initialState);
    const mockOnClose = jest.fn();
    
    render(
      <Provider store={store}>
        <MobileImageViewer onClose={mockOnClose} />
      </Provider>
    );
    
    expect(screen.getByText('Image Viewer')).toBeInTheDocument();
    expect(screen.getByAltText(`Selected image ${mockImage.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockImage.author)).toBeInTheDocument();
  });
  
  it('calls onClose when overlay is clicked', () => {
    const initialState = {
      images: {
        selectedImage: mockImage
      }
    };
    
    const store = mockStore(initialState);
    const mockOnClose = jest.fn();
    
    render(
      <Provider store={store}>
        <MobileImageViewer onClose={mockOnClose} />
      </Provider>
    );
    
    // Click the overlay (not the container)
    const overlay = screen.getByText('Image Viewer').parentElement?.parentElement;
    fireEvent.click(overlay!);
    
    expect(mockOnClose).toHaveBeenCalled();
  });
  
  it('does not call onClose when clicking inside the viewer container', () => {
    const initialState = {
      images: {
        selectedImage: mockImage
      }
    };
    
    const store = mockStore(initialState);
    const mockOnClose = jest.fn();
    
    render(
      <Provider store={store}>
        <MobileImageViewer onClose={mockOnClose} />
      </Provider>
    );
    
    // Click inside the container
    fireEvent.click(screen.getByText('Image Viewer'));
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });
  
  it('dispatches clearSelectedImage and calls onClose when clear button is clicked', () => {
    const initialState = {
      images: {
        selectedImage: mockImage
      }
    };
    
    const store = mockStore(initialState);
    const mockOnClose = jest.fn();
    
    render(
      <Provider store={store}>
        <MobileImageViewer onClose={mockOnClose} />
      </Provider>
    );
    
    // Click the clear button
    fireEvent.click(screen.getByText('Clear selection'));
    
    // Check if the correct action was dispatched
    const actions = store.getActions();
    expect(actions).toEqual([clearSelectedImage()]);
    
    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalled();
  });
});