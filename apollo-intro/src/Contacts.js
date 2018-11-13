import React from 'react';
import { gql, graphql } from 'react-apollo';


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
      <li>Larry David</li>
      <li>Jerry Seinfeld</li>
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
