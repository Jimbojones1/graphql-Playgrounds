import React, { Component } from 'react';
import Contacts from './Contacts';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AddContact from './AddContact';
import { Grid, Container } from 'semantic-ui-react';
import EditContact from './EditContact';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});


class App extends Component {
  constructor(){
    super();
    this.state = {
      editOpen: false,
      contactToEdit: {
        id: null,
        firstName: '',
        lastName: ''
      }
    }
  }
  handleEditState = (editState, contactToEdit) => {
    console.log(editState, ' dasfdasljkfkladsj')
    if(editState) {
      this.setState({
        editOpen: editState,
        contactToEdit: {
          ...contactToEdit
        }
      });
    } else {
      this.setState({editOpen: editState});
    }

  }
  handleEditInput = (e) => {
    this.setState({
      contactToEdit: {
        ...this.state.contactToEdit,
        [e.currentTarget.name]: e.currentTarget.value
      }
    })
  }
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
                <Contacts handleEditState={this.handleEditState}/>
              </Grid.Column>
              <EditContact open={this.state.editOpen} contactToEdit={this.state.contactToEdit} handleEditState={this.handleEditState} handleEditInput={this.handleEditInput}/>
            </Grid.Row>
          </Grid>
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
