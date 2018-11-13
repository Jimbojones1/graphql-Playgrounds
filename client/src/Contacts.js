import React from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";

const Contacts = ({ data: {loading, error, contacts}}) => {
  console.log(data, ' this is data')
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
    getAllContacts {
      id
      firstName
      lastName
    }
  }
`

export default graphql(contactsListQuery)(Contacts );
