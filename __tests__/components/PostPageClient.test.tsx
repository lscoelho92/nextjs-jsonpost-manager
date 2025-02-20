import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostPageClient from "@/components/PostPageClient";
import { usePostStore } from "@/store/usePostStore";
import { useRouter } from "next/navigation";

// Mock do usePostStore
jest.mock("@/store/usePostStore", () => ({
  usePostStore: jest.fn(),
}));

// Mock do useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("PostPageClient", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("should render the post content for an existing post", async () => {
    const mockPost = { id: 1, title: "Test Post", body: "Test Body" };

    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: { 1: mockPost },
      setPosts: jest.fn(),
      deletePost: jest.fn(),
      // Se necessário, também pode ser mockado getState para outros fluxos
      getState: jest.fn(() => ({ posts: { 1: mockPost } })),
    });

    render(<PostPageClient id="1" />);

    await waitFor(() => expect(screen.queryByTestId("loader")).toBeNull());

    // Verifica se os inputs/áreas de texto possuem os valores esperados
    const titleInput = screen.getByDisplayValue("Test Post") as HTMLInputElement;
    expect(titleInput).toBeInTheDocument();

    const bodyTextarea = screen.getByDisplayValue("Test Body") as HTMLTextAreaElement;
    expect(bodyTextarea).toBeInTheDocument();

    // Verifica o cabeçalho
    expect(screen.getByText("Edit Post")).toBeInTheDocument();
  });

  it("should render the create new post form", async () => {
    render(<PostPageClient id="new" />);

    await waitFor(() => expect(screen.queryByTestId("loader")).toBeNull());

    expect(screen.getByText("Create New Post")).toBeInTheDocument();
  });

  it("should show an error message when there is an error", async () => {
    const errorMessage = "Post not found";
    const errorCode = 404;

    render(
      <PostPageClient id="1" errorMessage={errorMessage} errorCode={errorCode} />
    );

    await waitFor(() => expect(screen.queryByTestId("loader")).toBeNull());

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(`Error number: ${errorCode}`)).toBeInTheDocument();
  });

  it("should display loader while loading", async () => {
    render(<PostPageClient id="1" />);

    // Verifica se o loader é exibido
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should redirect to 404 page when post is not found", async () => {
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: {},
      setPosts: jest.fn(),
      deletePost: jest.fn(),
      getState: jest.fn(() => ({ posts: {} })),
    });

    render(<PostPageClient id="999" />);

    // Aguarda a navegação para a página 404
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/404"));
  });

  it("should delete the post when confirmed", async () => {
    const mockPost = { id: 1, title: "Test Post", body: "Test Body" };
    const deletePostMock = jest.fn();
    const localMockPush = jest.fn();

    // Mock do usePostStore para simular o estado de posts
    (usePostStore as unknown as jest.Mock).mockReturnValue({
      posts: { 1: mockPost },
      setPosts: jest.fn(),
      deletePost: jest.fn(), // não será usado diretamente
    });

    // Adiciona o método estático getState que retorna um objeto com deletePost
    (usePostStore as any).getState = jest.fn(() => ({
      deletePost: deletePostMock,
    }));

    // Mock do useRouter com localMockPush (para isolar esse teste)
    (useRouter as jest.Mock).mockReturnValue({
      push: localMockPush,
    });

    render(<PostPageClient id="1" />);

    // Aguarda o loader desaparecer
    await waitFor(() => expect(screen.queryByTestId("loader")).toBeNull());

    // Clique no botão de deletar (na página principal)
    fireEvent.click(screen.getByTestId("delete-button"));

    // Aguarda o modal de confirmação ser exibido
    await waitFor(() =>
      expect(
        screen.getByText("Are you sure you want to delete this post?")
      ).toBeInTheDocument()
    );

    // Clique no botão de confirmação de exclusão dentro do modal
    fireEvent.click(screen.getByTestId("confirm-delete-button"));

    // Verifica se o método deletePost foi chamado com o ID correto
    expect(deletePostMock).toHaveBeenCalledTimes(1);
    expect(deletePostMock).toHaveBeenCalledWith(mockPost.id);

    // Verifica se o redirecionamento para a página inicial ocorreu
    expect(localMockPush).toHaveBeenCalledWith("/");
  });

  it("should cancel the deletion when cancel is clicked", async () => {
    render(<PostPageClient id="1" />);

    await waitFor(() => expect(screen.queryByTestId("loader")).toBeNull());

    // Clique no botão de deletar (na página principal)
    fireEvent.click(screen.getByTestId("delete-button"));

    // Aguarda o modal de confirmação ser exibido
    await waitFor(() =>
      expect(
        screen.getByText("Are you sure you want to delete this post?")
      ).toBeInTheDocument()
    );

    // Clique no botão de cancelar no modal
    fireEvent.click(screen.getByTestId("cancel-delete-button"));

    // Verifica se o modal foi fechado e a exclusão não foi realizada
    expect(
      screen.queryByText("Are you sure you want to delete this post?")
    ).not.toBeInTheDocument();
  });
});
