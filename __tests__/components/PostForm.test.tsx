import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostForm from '@/components/PostForm';
import { usePostStore } from '@/store/usePostStore';
import { Post } from '@/types/post';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  body: 'This is a test post body.',
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
});

jest.mock('@/store/usePostStore', () => ({
  usePostStore: jest.fn(),
}));

describe('PostForm', () => {
  it('should render the form with initial data for editing', () => {
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      addPost: jest.fn(),
      updatePost: jest.fn(),
      lastId: 1,
    });

    render(<PostForm initialPost={mockPost} isNewPost={false} />);

    expect(screen.getByPlaceholderText('Title')).toHaveValue(mockPost.title);
    expect(screen.getByPlaceholderText('Body')).toHaveValue(mockPost.body);
  });

  it('should display error messages when invalid data is submitted', async () => {
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      addPost: jest.fn(),
      updatePost: jest.fn(),
      lastId: 1,
    });
  
    render(<PostForm initialPost={{ id: 0, title: '', body: '' }} isNewPost={true} />);
  
    const submitButton = screen.getByText('Create Post');
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(screen.getByText('Title must be at least 3 characters long')).toBeInTheDocument();
      expect(screen.getByText('Body must be at least 5 characters long')).toBeInTheDocument();
    });
  });

  it('should call addPost when creating a new post', async () => {
    const mockAddPost = jest.fn();
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      addPost: mockAddPost,
      updatePost: jest.fn(),
      lastId: 1,
    });

    render(<PostForm initialPost={{ id: 0, title: '', body: '' }} isNewPost={true} />);

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Post' } });
    fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'New post body' } });

    const submitButton = screen.getByText('Create Post');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddPost).toHaveBeenCalledWith({
        id: 2,
        title: 'New Post',
        body: 'New post body',
      });
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('should call updatePost when updating an existing post', async () => {
    const mockUpdatePost = jest.fn();
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      addPost: jest.fn(),
      updatePost: mockUpdatePost,
      lastId: 1,
    });

    render(<PostForm initialPost={mockPost} isNewPost={false} />);

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Post' } });
    fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'Updated body content' } });

    const submitButton = screen.getByText('Update Post');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdatePost).toHaveBeenCalledWith(mockPost.id, {
        title: 'Updated Post',
        body: 'Updated body content',
      });
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('should call onDelete when the delete button is clicked', () => {
    const onDeleteMock = jest.fn();

    render(<PostForm initialPost={mockPost} isNewPost={false} onDelete={onDeleteMock} />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalled();
  });
});