import axios from "@/lib/axios";

export interface CommentProps {
  id?: number;
  author?: string;
  email: string;
  url?: string;
  comment: string;
  [key: string]: unknown
}
export async function create(data: CommentProps) {
  return axios.post<CommentProps>('/api/comment', data).then(res => {

  });
}