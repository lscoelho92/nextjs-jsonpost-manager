"use client";

import { create } from "zustand";
import { Post } from "@/types/post";

export interface PostStore {
  posts: Record<number, Post>;
  lastId: number;
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (id: number, updatedPost: Partial<Post>) => void;
  deletePost: (id: number) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: {},
  lastId: 0,

  setPosts: (posts) => {
    const postsMap = posts.reduce((acc, post) => {
      acc[post.id] = post;
      return acc;
    }, {} as Record<number, Post>);

    const maxId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) : 0;

    set({ posts: postsMap, lastId: maxId });
  },

  addPost: (post) =>
    set((state) => {
      const newId = state.lastId + 1;
      const newPost: Post = { ...post, id: newId };

      return {
        posts: { [newId]: newPost, ...state.posts },
        lastId: newId, // Update the last used ID
      };
    }),

  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: {
        ...state.posts,
        [id]: { ...state.posts[id], ...updatedPost },
      },
    })),

  deletePost: (id) =>
    set((state) => {
      const newPosts = { ...state.posts };
      delete newPosts[id];
      return { posts: newPosts };
    }),
}));
