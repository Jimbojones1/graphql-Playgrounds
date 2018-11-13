import React, { Component } from 'react';
import Contacts from './Contacts';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import './App.css';

const client = new ApolloClient();


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
