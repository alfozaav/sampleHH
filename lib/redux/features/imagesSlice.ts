import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ImageType } from '../../../types';

interface ImagesState {
  images: ImageType[];
  selectedImage: ImageType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ImagesState = {
  images: [],
  selectedImage: null,
  status: 'idle',
  error: null
};

// Fetch 30 images from picsum.photos
export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async () => {
    const response = await fetch('https://picsum.photos/v2/list?limit=30');
    
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    
    const data = await response.json();
    return data.map((item: any) => ({
      id: item.id,
      url: item.download_url,
      author: item.author,
      width: item.width,
      height: item.height
    }));
  }
);

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    selectImage: (state, action: PayloadAction<ImageType>) => {
      state.selectedImage = action.payload;
    },
    clearSelectedImage: (state) => {
      state.selectedImage = null;
    },
    addLocalImage: (state, action: PayloadAction<ImageType>) => {
      state.images.unshift(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
        state.error = null;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch images';
      });
  }
});

export const { selectImage, clearSelectedImage, addLocalImage } = imagesSlice.actions;
export default imagesSlice.reducer;