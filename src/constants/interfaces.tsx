import React from 'react';

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

export interface FlatPost {
  id: string;
  author: string;
  content: string;
  downvotes: string;
  upvotes: string;
  postedAtMS: number;
  replies?: Array<FlatPost['id']>;
  parentPost?: FlatPost['id'];
  result?: Result;
}

export interface CommentContextType {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export type ContractType = {
  name: string | undefined;
  price: string | undefined;
  bestOfferNo: string | undefined;
  bestOfferYes: string | undefined;
  betTotal?: number | undefined;
};

export type MarketInfo = {
  id?: number;
  i?: number;
  timestamp: number;
  name1?: string;
  price1?: string;
  bestOfferNo1?: string;
  bestOfferYes1?: string;
  betTotal1?: number;
  name2?: string;
  price2?: string;
  bestOfferNo2?: string;
  bestOfferYes2?: string;
  betTotal2?: number;
  name3?: string;
  price3?: string;
  bestOfferNo3?: string;
  bestOfferYes3?: string;
  betTotal3?: number;
  name4?: string;
  price4?: string;
  bestOfferNo4?: string;
  bestOfferYes4?: string;
  betTotal4?: number;
  name5?: string;
  price5?: string;
  bestOfferNo5?: string;
  bestOfferYes5?: string;
  betTotal5?: number;
  name6?: string;
  price6?: string;
  bestOfferNo6?: string;
  bestOfferYes6?: string;
  betTotal6?: number;
  name7?: string;
  price7?: string;
  bestOfferNo7?: string;
  bestOfferYes7?: string;
  betTotal7?: number;
  name8?: string;
  price8?: string;
  bestOfferNo8?: string;
  bestOfferYes8?: string;
  betTotal8?: number;
};
