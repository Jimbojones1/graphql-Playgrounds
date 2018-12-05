import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import { Button, Form, Modal } from 'semantic-ui-react';
import { contactsListQuery } from '../Contacts';

class EditContact extends Component {
  editContact = (e) => {
    console.log(this.props.contactToEdit)
    this.props.mutate({
       variables: {editContact: {id: this.props.contactToEdit.id, firstName: this.props.contactToEdit.firstName, lastName: this.props.contactToEdit.lastName}},
       update: (store, { data: { editContact }, error}) => {
            console.log(error, ' this is error')
            console.log(editContact)
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: contactsListQuery });
            // // edit contact
            console.log(data, ' data inside of update')
            data.contacts[editContact.id] = editContact;
            // console.log(updatedList, ' this is it')
            console.log(data)
            // // // Write our data back to the cache.
            store.writeQuery({ query: contactsListQuery, data});
            this.props.handleEditState(false);
          },
    })
  };
  handleInput = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value});
  }
  render(){
    return (
      <Modal open={this.props.open}>
      <Form onSubmit={this.editContact} className="centered">
        <Form.Input value={this.props.contactToEdit.firstName} placeholder="first name" name='firstName' onChange={this.props.handleEditInput}/>
        <Form.Input value={this.props.contactToEdit.lastName} placeholder="last name" name='lastName' onChange={this.props.handleEditInput}/>
        <Button type="Submit">Edit Contact</Button>
      </Form>
      </Modal>
      )
  }

}

// First line makes sure right value is passed

export const editContactMutation = gql`
  mutation editContact($editContact: ContactInput)
  {
    editContact(editContact: $editContact){
      id
      firstName
      lastName
    }
  }
`



export default graphql(editContactMutation)(EditContact);
