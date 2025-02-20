import { usePostStore } from '@/store/usePostStore';
import { Post } from '@/types/post';

describe('usePostStore', () => {
  // Reseta o estado da store antes de cada teste para garantir testes isolados
  beforeEach(() => {
    usePostStore.setState({ posts: {}, lastId: 0 });
  });

  it('should initialize the store with empty posts and lastId equal to 0', () => {
    const { posts, lastId } = usePostStore.getState();
    expect(posts).toEqual({});
    expect(lastId).toBe(0);
  });

  it('should set posts correctly with non-empty array', () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Post 1', body: 'Body 1' },
      { id: 2, title: 'Post 2', body: 'Body 2' },
    ];
    
    usePostStore.getState().setPosts(mockPosts);
    
    const { posts, lastId } = usePostStore.getState();
    expect(Object.keys(posts).length).toBe(2);
    expect(posts[1].title).toBe('Post 1');
    expect(posts[2].title).toBe('Post 2');
    expect(lastId).toBe(2);  // O maior id dentre os posts é 2
  });

  it('should set posts correctly when given an empty array', () => {
    usePostStore.getState().setPosts([]);
    const { posts, lastId } = usePostStore.getState();
    expect(posts).toEqual({});
    expect(lastId).toBe(0);
  });

  it('should add a new post correctly', () => {
    const newPost: Post = { id: 0, title: 'New Post', body: 'New body' };
    usePostStore.getState().addPost(newPost);
    
    const { posts, lastId } = usePostStore.getState();
    // Como o estado foi resetado, o novo id deve ser 1
    expect(lastId).toBe(1);
    expect(posts[1].title).toBe('New Post');
    expect(posts[1].body).toBe('New body');
  });

  it('should update a post correctly', () => {
    // Adiciona um post primeiro
    usePostStore.getState().addPost({ id: 0, title: 'Original Post', body: 'Body' });
    // Atualiza o post com id 1
    usePostStore.getState().updatePost(1, { title: 'Updated Post' });
    
    const { posts } = usePostStore.getState();
    expect(posts[1].title).toBe('Updated Post');
  });

  it('should delete a post correctly', () => {
    // Adiciona um post primeiro
    usePostStore.getState().addPost({ id: 0, title: 'Post to delete', body: 'Body' });
    // Deleta o post com id 1
    usePostStore.getState().deletePost(1);
    
    const { posts } = usePostStore.getState();
    expect(posts[1]).toBeUndefined();
  });
});
