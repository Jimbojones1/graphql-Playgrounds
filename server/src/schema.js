import {addMockFunctionsToSchema} from 'graphql-tools';
import { ApolloServer, gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Contact {
    id: ID!
    firstName: String
    lastName: String
  }


  type Query {
    contacts: [Contact]
  }
`;



const GraphqlServer = new ApolloServer({
  typeDefs: typeDefs,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    setting: {
      'editor.theme': 'light'
    }
  }
});

export default GraphqlServer;
