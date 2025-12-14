import { getContractComment } from "./get-contract-comment"
import { getContractComments } from "./get-contract-comments"
import { postComment } from "./post-comment"

const CommentService = {
  getContractComments,
  getContractComment,
  postComment,
}

export default CommentService