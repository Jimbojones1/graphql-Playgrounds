import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";

import { contactsListQuery } from './Contacts';

class AddContact extends Component {
  state = {
    firstName: '',
    lastName: ''
  }
  handleSave = (e) => {
    e.preventDefault();
    const { firstName, lastName } = this.state;
    this.props.mutate({
      variables: {firstName, lastName},
       update: (store, { data: { addContact } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: contactsListQuery });
            // Add our comment from the mutation to the end.
            data.contacts.push(addContact);
            // // Write our data back to the cache.
            store.writeQuery({ query: contactsListQuery, data });
          },
    })
  }
  handleInput = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value});
  }
  render(){
    return (
      <form onSubmit={this.handleSave}>
        <input value={this.state.firstName} placeholder="first name" name='firstName' onChange={this.handleInput}/>
        <input value={this.state.lastName} placeholder="last name" name='lastName' onChange={this.handleInput}/>
        <button type="Submit">Add Contact</button>
      </form>
      )
  }

}

// First line makes sure right value is passed
export const createContact = gql`
  mutation addContact($firstName: String!, $lastName: String!){
    addContact(firstName: $firstName, lastName: $lastName){
      id
      firstName
      lastName
    }
  }
`

const AddContactWithMutation = graphql(createContact)(AddContact);

export default AddContactWithMutation;
