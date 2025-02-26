export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostFormProps {
  initialPost: Post;
  isNewPost: boolean;
}
