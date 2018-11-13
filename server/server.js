import express from 'express';
import GraphqlServer from './src/schema';

const PORT = 4000;

const app = express();

GraphqlServer.applyMiddleware({
  app: app
})
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema}))
// // graphiql is an interface we can test our queiries
// app.use('/graphiql', bodyParser.json(), graphiqlExpress({ endpointURL: 'graphql' }));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log(`Graphql http://localhost:${PORT}/graphql`);
});
