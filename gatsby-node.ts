import type { GatsbyNode } from 'gatsby';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  getConfig
}) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
    
  });
  const config = getConfig()
  if (config.externals && config.externals[0]) {
    config.externals[0]["node:crypto"] = 'crypto-browserify';
  }
  actions.replaceWebpackConfig(config)
};

import flatJSON from './src/static/flatResults.json';
import { FlatPost } from './src/constants/interfaces';

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createNodeId, getCache }, config) => {
  const { createNode } = actions
  const flatResults = flatJSON as Array<FlatPost>
  flatResults.forEach((flatPost) => { 
    createNode({
      ...flatPost,
      
      internal: {
        type: `FlatPost`,
        content: JSON.stringify(flatPost),
        contentDigest: JSON.stringify(flatPost),
      },
    })
  })
}