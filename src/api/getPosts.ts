import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import postsJSON from '../static/results.json';

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
) {
  res.send(postsJSON);
}
