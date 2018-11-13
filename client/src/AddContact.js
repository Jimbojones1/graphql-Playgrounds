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
    const id = require('crypto').randomBytes(5).toString('hex');
    this.props.mutate({
      variables: {id, firstName, lastName},
      optimisticResponse: {
        addContact: {
          id,
          firstName,
          lastName,
          __typename: 'Contact',
        },
      },
      update: (store, {data : {addContact}}) => {
        // It takes the store, and the data we get from our mutation
        const data = store.readQuery({  query: contactsListQuery})
        // Grabbing the data Before the query ^
        data.contacts.push(addContact);
        // then we push the data from addContact that we just got
        // from adding a new contact
        store.writeQuery({query: contactsListQuery, data});
        //So then we write it to the store by using a query, (the first argument),
        // then the second argument is the all the updated information
        // So now we get the ui update as soon as we send it to the server
        // so our redux store is updated at the same time as our data is sent
        // to graphql
      }
    }).then( res => {
      this.setState({
        firstName: '',
        lastName: ''
      });
    });
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
  mutation addContact($id: String!, $firstName: String!, $lastName: String!){
    addContact(id: $id, firstName: $firstName, lastName: $lastName){
      id
      firstName
      lastName
    }
  }
`

const AddContactWithMutation = graphql(createContact)(AddContact);

export default AddContactWithMutation;
