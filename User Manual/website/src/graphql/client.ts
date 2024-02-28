import { GraphQLClient } from 'graphql-request';

const config: { mode: RequestMode; credentials: RequestCredentials } = {
  mode:'cors',
  credentials:'include',
};

const gqlClient = new GraphQLClient(
  process.env.GRAPHQL_SCHEMA_API_URL || 'http://cbd.runjs.cn/graphql',
  config,
);

export default gqlClient;
