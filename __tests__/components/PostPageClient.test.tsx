import { render, screen, fireEvent } from "@testing-library/react";
import PostPageClient from "@/components/PostPageClient";
import { usePostStore } from "@/store/usePostStore";
import { useRouter, notFound } from "next/navigation";

jest.mock("@/store/usePostStore", () => ({
  usePostStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

jest.mock("@/components/PostForm", () => {
  const PostFormMock = (props: any) => {
    return (
      <div>
        <input
          data-testid="title-input"
          value={props.initialPost?.title || ""}
          readOnly
        />
        <textarea
          data-testid="body-textarea"
          value={props.initialPost?.body || ""}
          readOnly
        />
        {!props.isNewPost && (
          <button data-testid="delete-button" onClick={props.onDelete}>
            Delete
          </button>
        )}
      </div>
    );
  };
  PostFormMock.displayName = "PostForm";
  return PostFormMock;
});

jest.mock("@/components/ConfirmModal", () => {
  const ConfirmModalMock = (props: any) => {
    if (!props.isOpen) return null;
    return (
      <div>
        <p>Are you sure you want to delete this post?</p>
        <button data-testid="confirm-delete-button" onClick={props.onConfirm}>
          Confirm
        </button>
        <button data-testid="cancel-delete-button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    );
  };
  ConfirmModalMock.displayName = "ConfirmModal";
  return ConfirmModalMock;
});

describe("PostPageClient", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the post content for an existing post", () => {
    const mockPost = { id: 1, title: "Test Post", body: "Test Body" };

    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: { 1: mockPost },
      deletePost: jest.fn(),
    });

    render(<PostPageClient id="1" initialPost={mockPost} />);

    expect(screen.getByTestId("title-input")).toHaveValue("Test Post");
    expect(screen.getByTestId("body-textarea")).toHaveValue("Test Body");
    expect(screen.getByText("Edit Post")).toBeInTheDocument();
  });

  it("should render the create new post form", () => {
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: {},
      deletePost: jest.fn(),
    });

    render(<PostPageClient id="new" initialPost={null} />);

    expect(screen.getByText("Create New Post")).toBeInTheDocument();
  });

  it("should call notFound() when the post does not exist", () => {
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: {},
      deletePost: jest.fn(),
    });

    expect(() => render(<PostPageClient id="0" initialPost={null} />)).toThrow(
      "NEXT_NOT_FOUND"
    );
    expect(notFound).toHaveBeenCalled();
  });

  it("should delete the post when confirmed", () => {
    const mockPost = { id: 1, title: "Test Post", body: "Test Body" };
    const deletePostMock = jest.fn();

    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: { 1: mockPost },
      deletePost: deletePostMock,
    });

    render(<PostPageClient id="1" initialPost={mockPost} />);

    fireEvent.click(screen.getByTestId("delete-button"));
    expect(
      screen.getByText("Are you sure you want to delete this post?")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("confirm-delete-button"));

    expect(deletePostMock).toHaveBeenCalledTimes(1);
    expect(deletePostMock).toHaveBeenCalledWith(mockPost.id);
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("should cancel the deletion when cancel is clicked", () => {
    const mockPost = { id: 1, title: "Test Post", body: "Test Body" };

    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: { 1: mockPost },
      deletePost: jest.fn(),
    });

    render(<PostPageClient id="1" initialPost={mockPost} />);

    fireEvent.click(screen.getByTestId("delete-button"));
    expect(
      screen.getByText("Are you sure you want to delete this post?")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("cancel-delete-button"));
    expect(
      screen.queryByText("Are you sure you want to delete this post?")
    ).toBeNull();
  });
});
