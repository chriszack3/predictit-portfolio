export interface Post {
  opAuthor: string;
  opContent: string;
  downvotes: string;
  upvotes: string;
  postedAtMS: number;
  replies: Array<Post>;
}
