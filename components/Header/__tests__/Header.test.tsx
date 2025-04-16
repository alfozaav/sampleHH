
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

describe('Header', () => {
  it('renders the header with logo correctly', () => {
    render(<Header />);
    
    // Check if header has the correct role
    expect(screen.getByRole('banner')).toBeInTheDocument();
    
    // Check if the logo image is present
    const logoImage = screen.getByAltText('ImagineX White Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/logo.webp');
    
    // Check if the logo is inside an h1 element
    expect(logoImage.closest('h1')).toBeInTheDocument();
  });
});