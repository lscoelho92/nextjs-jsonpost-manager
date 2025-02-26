import { getPosts, getPost } from '@/lib/api';
import { Post } from '@/types/post';

global.fetch = jest.fn();

describe('API module', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('should return posts when the API request is successful', async () => {
      const mockPosts: Post[] = [
        { id: 1, title: 'Post 1', body: 'Body 1' },
        { id: 2, title: 'Post 2', body: 'Body 2' },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockPosts,
      });

      const posts = await getPosts();

      expect(posts).toEqual(mockPosts);
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the API request fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Server error' }),
      });

      await expect(getPosts()).rejects.toThrow('HTTP error! status: 500');
    });

    it('should simulate a delay correctly in getPosts', async () => {
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const mockPosts: Post[] = [
        { id: 1, title: 'Post 1', body: 'Body 1' },
        { id: 2, title: 'Post 2', body: 'Body 2' },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockPosts,
      });

      await getPosts();
      expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPost', () => {
    it('should return a post when the API request is successful', async () => {
      const mockPost: Post = { id: 1, title: 'Post 1', body: 'Body 1' };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockPost,
      });

      const post = await getPost("1");

      expect(post).toEqual(mockPost);
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should return null when the API request fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Not Found' }),
      });

      const post = await getPost("1");

      expect(post).toBeNull();
      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
    });

    it('should simulate a delay correctly in getPost', async () => {
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const mockPost: Post = { id: 1, title: 'Post 1', body: 'Body 1' };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockPost,
      });

      await getPost("1");
      expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    });
  });
});
