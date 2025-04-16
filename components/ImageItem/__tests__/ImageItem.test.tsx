import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ImageItem from '@/components/ImageItem';
import { selectImage } from '@/lib/redux/features/imagesSlice';

// Mock the Redux store
const mockStore = configureStore([]);

describe('ImageItem', () => {
  const mockImage = { 
    id: '123', 
    url: '/test-image.jpg',
    author: 'Test Author',
    width: 800,
    height: 600
  };

  it('renders the image correctly', () => {
    // Create mock store with no selected image
    const initialState = {
      images: {
        selectedImage: null
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <ImageItem image={mockImage} />
      </Provider>
    );
    
    // Check if the image is rendered with correct attributes
    const imageElement = screen.getByAltText(`Image ${mockImage.id}`);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockImage.url);
    expect(imageElement).toHaveAttribute('loading', 'lazy');
  });

  it('applies selected styles when image is selected', () => {
    // Create mock store with this image selected
    const initialState = {
      images: {
        selectedImage: mockImage
      }
    };
    
    const store = mockStore(initialState);
    
    const { container } = render(
      <Provider store={store}>
        <ImageItem image={mockImage} />
      </Provider>
    );
    
    // Check for a visually distinct selected state
    const itemElement = container.firstChild as HTMLElement;
  
    expect(itemElement).toHaveStyleRule('box-shadow', expect.stringContaining('3px #3498db'));
  });

  it('dispatches selectImage action when clicked', () => {
    // Create mock store
    const initialState = {
      images: {
        selectedImage: null
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <ImageItem image={mockImage} />
      </Provider>
    );
    
    // Find and click the image item
    const imageContainer = screen.getByAltText(`Image ${mockImage.id}`).closest('div');
    fireEvent.click(imageContainer!);
    
    // Check if the correct action was dispatched
    const actions = store.getActions();
    expect(actions).toEqual([selectImage(mockImage)]);
  });
});