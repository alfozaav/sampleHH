import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ImageList from '@/components/ImageList';

// Mock the ImageItem component to simplify testing
jest.mock('@/components/ImageItem', () => {
  return function MockImageItem({ image }: { image: any }) {
    return <div data-testid={`image-item-${image.id}`}>{image.author}</div>;
  };
});

// Mock the ThreeDots component from react-loader-spinner
jest.mock('react-loader-spinner', () => ({
  ThreeDots: () => <div data-testid="loading-spinner">Loading...</div>
}));

const mockStore = configureStore([]);

describe('ImageList', () => {
  it('shows loading spinner when status is loading', () => {
    const initialState = {
      images: {
        images: [],
        status: 'loading',
        error: null
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <ImageList />
      </Provider>
    );
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
  
  it('shows error message when status is failed', () => {
    const initialState = {
      images: {
        images: [],
        status: 'failed',
        error: 'Failed to load images'
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <ImageList />
      </Provider>
    );
    
    expect(screen.getByText(/Failed to load images/i)).toBeInTheDocument();
  });
  
  it('renders list of images when images are available', () => {
    const mockImages = [
      { id: '1', url: '/image1.jpg', author: 'Author 1', width: 800, height: 600 },
      { id: '2', url: '/image2.jpg', author: 'Author 2', width: 800, height: 600 }
    ];
    
    const initialState = {
      images: {
        images: mockImages,
        status: 'succeeded',
        error: null
      }
    };
    
    const store = mockStore(initialState);
    
    render(
      <Provider store={store}>
        <ImageList />
      </Provider>
    );
    
    expect(screen.getByTestId('image-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('image-item-2')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Author 2')).toBeInTheDocument();
  });
});