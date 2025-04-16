import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer', () => {
  it('renders the footer correctly', () => {
    render(<Footer />);
    
    // Check if footer contains the challenge text
    expect(screen.getByText(/Imagine X Front-End Challenge/i)).toBeInTheDocument();
    
    // Check if footer contains the GitHub link
    expect(screen.getByText(/View on GitHub/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com/your-username/imagex-gallery');
    
    // Check if footer contains the author credit
    expect(screen.getByText(/by Alfonso Zavala/i)).toBeInTheDocument();
    
    // Check if footer has the correct role
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});