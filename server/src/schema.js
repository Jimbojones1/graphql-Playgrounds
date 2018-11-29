import {addMockFunctionsToSchema} from 'graphql-tools';
import { ApolloServer, gql } from 'apollo-server-express';
import { resolvers } from './resolvers';

export const typeDefs = gql`
  type Contact {
    id: ID!
    firstName: String
    lastName: String
  }


  type Query {
    contacts: [Contact]
  }

  type Mutation {
    addContact(firstName: String!, lastName: String!): Contact
    deleteContact(id: ID!): String
  }
`;



const GraphqlServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    setting: {
      'editor.theme': 'light'
    }
  }
});

export default GraphqlServer;
