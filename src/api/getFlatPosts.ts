import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import flatPostsJSON from '../static/flatResults.json';

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
) {
  return res.send(JSON.stringify(flatPostsJSON));
}
