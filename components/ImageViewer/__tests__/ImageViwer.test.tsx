import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ImageViewer from '@/components/ImageViewer';
import { clearSelectedImage } from '@/lib/redux/features/imagesSlice';

const mockStore = configureStore([]);

describe('ImageViewer', () => {
  it('displays a message when no image is selected', () => {
    const initialState = {
      images: {
        selectedImage: null
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <ImageViewer />
      </Provider>
    );
    
    expect(screen.getByText('Select an image to view')).toBeInTheDocument();
  });
  
  it('displays selected image when an image is selected', () => {
    const mockImage = {
      id: '123',
      url: '/test-image.jpg',
      author: 'Test Author',
      width: 800,
      height: 600
    };
    
    const initialState = {
      images: {
        selectedImage: mockImage
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <ImageViewer />
      </Provider>
    );
    
    expect(screen.getByText('Image Viewer')).toBeInTheDocument();
    expect(screen.getByAltText(`Selected image ${mockImage.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockImage.author)).toBeInTheDocument();
  });
  
  it('dispatches clearSelectedImage action when clear button is clicked', () => {
    const mockImage = {
      id: '123',
      url: '/test-image.jpg',
      author: 'Test Author',
      width: 800,
      height: 600
    };
    
    const initialState = {
      images: {
        selectedImage: mockImage
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <ImageViewer />
      </Provider>
    );
    
    // Click the clear button
    fireEvent.click(screen.getByText('Clear selection'));
    
    // Check if the correct action was dispatched
    const actions = store.getActions();
    expect(actions).toEqual([clearSelectedImage()]);
  });
});