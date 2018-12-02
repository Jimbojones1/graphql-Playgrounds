import React, { Component } from 'react';
import Contacts from './Contacts';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AddContact from './AddContact';
import { Grid, Container } from 'semantic-ui-react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Grid  columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
            <Grid.Row >
              <Grid.Column style={{backgroundColor: 'green'}}>
                <AddContact />
              </Grid.Column>
              <Grid.Column  style={{backgroundColor: 'purple'}}>
                <Contacts />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
