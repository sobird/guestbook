import axios from "@/lib/axios";
import { CommentCreationAttributes, Comment } from "@/models/comment";

type findAllWithPaginationType = typeof Comment.findAllWithPagination;
type createType = typeof Comment.create;

export async function findAllWithPagination(data?: Parameters<findAllWithPaginationType>) {
  return axios.get<ReturnType<findAllWithPaginationType>>("/api/comments", {
    params: data,
  });
}

export async function create(data: Parameters<createType>) {
  return axios.post<ReturnType<createType>>("/api/comments", data);
}

const CommentService = {
  findAllWithPagination,
  create,
};

export default CommentService;
