import axios from "@/lib/axios";
import { CommentCreationAttributes } from "@/models/comment";

export async function create(data: CommentCreationAttributes) {
  return axios.post<any, CommentCreationAttributes>("/api/comments", data);
}

export interface CommentQueryParams {
  ps: number;
  pn: number;
}

export async function query(data?: CommentQueryParams) {
  return axios.get<CommentCreationAttributes>("/api/comments", {
    params: data,
  });
}