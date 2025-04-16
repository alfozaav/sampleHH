import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UploadButton from '@/components/UploadButton';
import * as imagesSlice from '@/lib/redux/features/imagesSlice';

// Mock the Redux store
const mockStore = configureStore([]);

// Mock the addLocalImage action
jest.mock('@/lib/redux/features/imagesSlice', () => ({
  ...jest.requireActual('@/lib/redux/features/imagesSlice'),
  addLocalImage: jest.fn(() => ({ type: 'images/addLocalImage' }))
}));

describe('UploadButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the upload button', () => {
    const store = mockStore({});
    
    render(
      <Provider store={store}>
        <UploadButton />
      </Provider>
    );
    
    expect(screen.getByText('Upload an Image')).toBeInTheDocument();
  });
  
  it('opens file dialog when button is clicked', () => {
    const store = mockStore({});
    
    render(
      <Provider store={store}>
        <UploadButton />
      </Provider>
    );
    
    // Create a mock click function for the hidden input
    const clickSpy = jest.fn();
    
    // Find the hidden input and replace its click method
    const hiddenInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    hiddenInput.click = clickSpy;
    
    // Click the upload button
    fireEvent.click(screen.getByText('Upload an Image'));
    
    // Verify the hidden input's click method was called
    expect(clickSpy).toHaveBeenCalled();
  });
  
  it('handles file selection', () => {
    // Verify that the component accepts files
    const store = mockStore({});
    
    render(
      <Provider store={store}>
        <UploadButton />
      </Provider>
    );
    
    // Get the file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    // Check that it has the correct attributes
    expect(fileInput).toHaveAttribute('type', 'file');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
    expect(fileInput).toHaveAttribute('multiple');
  });
});