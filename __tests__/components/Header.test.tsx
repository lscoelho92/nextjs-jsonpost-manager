import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header', () => {
  it('should render "New Post" link when not on post page', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<Header />);

    expect(screen.getByText('New Post')).toBeInTheDocument();
  });

  it('should render "Return to Homepage" link when on a post page', () => {
    (usePathname as jest.Mock).mockReturnValue('/posts/1');

    render(<Header />);

    expect(screen.getByText('Return to Homepage')).toBeInTheDocument();
  });

  it('should render the title correctly', () => {
    render(<Header />);

    expect(screen.getByText('AnyDesk Posts Manager')).toBeInTheDocument();
  });
});
