import { render, screen, waitFor } from "@testing-library/react";
import PostsList from "@/components/PostsList";
import { usePostStore } from "@/store/usePostStore";
import { Post } from "@/types/post";

// Mock do usePostStore
jest.mock('@/store/usePostStore', () => ({
  usePostStore: jest.fn(),
}));

describe("PostsList", () => {
  it("should call setPosts with initialPosts when posts is empty", async () => {
    const initialPosts: Post[] = [
      { id: 1, title: "Post 1", body: "Body 1" },
      { id: 2, title: "Post 2", body: "Body 2" },
    ];
    const setPostsMock = jest.fn();
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: {},
      setPosts: setPostsMock,
    });

    render(
      <PostsList initialPosts={initialPosts} errorMessage={null} errorCode={null} />
    );

    await waitFor(() => expect(setPostsMock).toHaveBeenCalled());
    expect(setPostsMock).toHaveBeenCalledWith(initialPosts);
  });

  it("should render the correct number of PostCards when posts are present", () => {
    const postsObject: { [key: number]: Post } = {
      1: { id: 1, title: "Post 1", body: "Body 1" },
      2: { id: 2, title: "Post 2", body: "Body 2" },
    };
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: postsObject,
      setPosts: jest.fn(),
    });

    render(
      <PostsList initialPosts={[]} errorMessage={null} errorCode={null} />
    );

    const postCards = screen.getAllByRole("link");
    expect(postCards.length).toBe(Object.keys(postsObject).length);
  });

  it("should render PostCards sorted in descending order of id", () => {
    const postsObject: { [key: number]: Post } = {
      1: { id: 1, title: "Post 1", body: "Body 1" },
      2: { id: 2, title: "Post 2", body: "Body 2" },
      3: { id: 3, title: "Post 3", body: "Body 3" },
    };
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: postsObject,
      setPosts: jest.fn(),
    });

    render(
      <PostsList initialPosts={[]} errorMessage={null} errorCode={null} />
    );

    const postCards = screen.getAllByRole("link");
    expect(postCards).toHaveLength(3);
    
    expect(postCards[0]).toHaveTextContent("Post 3");
    expect(postCards[1]).toHaveTextContent("Post 2");
    expect(postCards[2]).toHaveTextContent("Post 1");
  });

  it("should render the no posts message correctly when there are no posts", () => {
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: {},
      setPosts: jest.fn(),
    });

    render(
      <PostsList initialPosts={[]} errorMessage={null} errorCode={null} />
    );

    const noPostsMessage = screen.getByText(
      "There are no registered posts. Please enter a new Post to be displayed in the list."
    );
    expect(noPostsMessage).toBeInTheDocument();
    expect(noPostsMessage).toHaveClass("text-gray-600", "font-bold", "italic");
  });

  it("should should render error message if fetch api have error", async () => {
    const errorMessage = "An error occurred!";
  
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: {},
      setPosts: jest.fn(),
    });
  
    render(<PostsList initialPosts={[]} errorMessage={errorMessage} errorCode={null} />);
  
    await waitFor(() => {
      const errorContainer = screen.getByRole("alert");
      expect(errorContainer).toBeInTheDocument();
      expect(errorContainer).toHaveTextContent(errorMessage);
    });
  });
});
