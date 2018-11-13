import React from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";

const Contacts = ({ data: {loading, error, contacts}}) => {
  if(loading){
    return <p>Loading...</p>
  }

  if(error){
    return <p>{error.message}</p>
  }

  const contactList = contacts.map((contact) => {
    return <li key={contact.id}>{contact.firstName} {contact.lastName}</li>
  })

  return (
    <ul>
      {contactList}
    </ul>
    )
}

export const contactsListQuery = gql`
  query ContactsQuery {
    contacts {
      id
      firstName
      lastName
    }
  }
`

export default graphql(contactsListQuery)(Contacts );
