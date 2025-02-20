import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';
import { Post } from '@/types/post';

describe('PostCard Component', () => {
  const mockPost: Post = {
    id: 1,
    title: 'A'.repeat(51),
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  it('should render the title and body correctly', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('A'.repeat(50) + '...');
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
  });

  it('should truncate the title if it is too long', () => {
    const longTitlePost = { ...mockPost, title: 'A'.repeat(51) };
    render(<PostCard post={longTitlePost} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('A'.repeat(50) + '...');
  });

  it('should truncate the body if it is too long', () => {
    const longBodyPost = { ...mockPost, body: 'A'.repeat(101) };
    render(<PostCard post={longBodyPost} />);
    expect(screen.getByText('A'.repeat(100) + '...')).toBeInTheDocument();
  });

  it('should contain a link with the correct href', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/posts/1');
  });
});
