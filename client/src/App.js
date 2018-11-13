import React, { Component } from 'react';
import Contacts from './Contacts';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import './App.css';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
  networkInterface: networkInterface
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Contacts />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
