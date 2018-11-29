import React from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";

const Contacts = ({data}) => {
  console.log(data)
  if(data.loading){
    return <p>Loading...</p>
  }

  if(data.error){
    return <p>{data.error.message}</p>
  }

  const contactList = data.contacts.map((contact) => {
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

export default graphql(contactsListQuery)(Contacts);
