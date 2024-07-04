type Sentiment = {
  magnitude: number;
  score: number;
};
type Text = {
  beginOffset: number;
  content: string;
};
export type Sentence = {
  sentiment: Sentiment;
  text: Text;
};

export interface Result {
  documentSentiment: Sentiment;
  language: string;
  sentences: Array<Sentence>;
}

export interface Post {
  opAuthor: string;
  opContent: string;
  downvotes: string;
  upvotes: string;
  postedAtMS: number;
  replies?: Array<Post>;
  result?: Result;
  threadAvgScore?: number;
  threadScoreTotal?: number;
  threadCountTotal?: number;
}
