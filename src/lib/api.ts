import { Post } from "@/types/post";

// Simulate delay in fetching data from API
const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  await simulateDelay(2000);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  await simulateDelay(2000);
  if (!res.ok) {
    return null
  } else {
    return res.json();
  }
}