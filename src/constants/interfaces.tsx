export interface Post {
  opAuthor: string;
  opContent: string;
  downvotes: string;
  upvotes: string;
  replies: Array<Post>;
}
