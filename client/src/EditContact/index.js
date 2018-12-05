import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import { Button, Form, Modal } from 'semantic-ui-react';
import { contactsListQuery } from '../Contacts';

class EditContact extends Component {
  state = {
    firstName: '',
    lastName: ''
  }
  editContact = (contact, e) => {
    // console.log(editContactProp, ' this is editContactProp', contact)
    this.props.mutate({
       variables: {id: parseInt(contact.id), contact: contact},
       update: (store, { data: { editContact }, error}) => {
            console.log(error, ' this is error')
            console.log(editContact)
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: contactsListQuery });
            // // edit contact
            console.log(data, ' data inside of update')
            data.contacts[editContact.id] = editContact;
            // console.log(updatedList, ' this is it')
            // // // Write our data back to the cache.
            store.writeQuery({ query: contactsListQuery, data});
          },
    })
  };
  handleInput = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value});
  }
  render(){
    return (
      <Modal open={this.props.open}>
      <Form onSubmit={this.handleSave} className="centered">
        <Form.Input value={this.state.firstName} placeholder="first name" name='firstName' onChange={this.handleInput}/>
        <Form.Input value={this.state.lastName} placeholder="last name" name='lastName' onChange={this.handleInput}/>
        <Button type="Submit">Edit Contact</Button>
      </Form>
      </Modal>
      )
  }

}

// First line makes sure right value is passed

export const editContactMutation = gql`
  mutation editContact($id: ID!, $contact: ContactInput)
  {
    editContact(id: $id, contact: $contact)
  }
`



export default graphql(editContactMutation)(EditContact);
