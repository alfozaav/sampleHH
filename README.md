# ImagineX Front-End Challenge

A modern, responsive image gallery built with Next.js, Redux Toolkit, and Styled Components. This project demonstrates the use of these technologies to complete the challenge.


## 🌟 Features

- **Responsive Design**: Optimized for both desktop and mobile experiences
- **Image Gallery**: Browse through a curated list of images from Picsum Photos API
- **Image Selection**: Click on thumbnails to view larger images with author(details)
- **Image Upload**: Upload your own images to the gallery
- **State Management**: Efficient state handling with Redux Toolkit
- **Modern UI**: Clean interface built with Styled Components
- **Comprehensive Testing**: Simple Jest test suite for all components

## 🛠️ Technology Stack

- **Framework**: [Next.js 15.3.0](https://nextjs.org/) (App Router)
- **UI Library**: [React 19.0.0](https://reactjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Styled Components](https://styled-components.com/)
- **Loading Animations**: [React Loader Spinner](https://mhnpd.github.io/react-loader-spinner/)
- **Testing**: [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 📂 Project Structure

```
project-root/
├── app/                    # Next.js App Router files
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page component
├── components/             # React components
│   ├── Footer/             # Footer component
│   ├── Header/             # Header component
│   ├── ImageGallery/       # Main gallery component
│   ├── ImageItem/          # Individual image thumbnail
│   ├── ImageList/          # List of image thumbnails
│   ├── ImageViewer/        # Selected image viewer
│   ├── MobileImageViewer/  # Mobile-specific image viewer
│   └── UploadButton/       # Image upload functionality
├── lib/                    # Library code
│   ├── redux/              # Redux setup
│   │   ├── features/       # Redux slices
│   │   ├── hooks.ts        # Custom Redux hooks
│   │   ├── provider.tsx    # Redux provider
│   │   └── store.ts        # Redux store configuration
│   └── utils/              # Utility functions
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── test setup files        # Jest configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alfozaav/imaginex-challenge
   cd imaginex-challenge
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) or url provided in the console in your browser to see the result.

## 🧪 Testing

The project includes comprehensive tests for all components:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📱 Responsive Design

The gallery is fully responsive with specific optimizations:

- **Desktop**: Side-by-side layout with thumbnail list and large image viewer
- **Mobile**: Scrollable horizontal thumbnail list with fullscreen image popup

## 🔄 State Management

Redux Toolkit is used for state management with the following features:
- Fetching images from Picsum Photos API
- Managing selected image state
- Handling local image uploads

## 🎨 Styling

The project uses Styled Components for component-specific styling and a global CSS file for:
- Custom color variables
- Global resets and defaults
- Responsive layout utilities

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgements

- [Picsum Photos](https://picsum.photos/) for the placeholder images API
- [Next.js](https://nextjs.org/) for the React framework
- [Vercel](https://vercel.com/) for hosting recommendations