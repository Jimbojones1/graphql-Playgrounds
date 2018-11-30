import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from "graphql-tag";

const Contacts = (props) => {

  const deleteContact = (id, e) => {
    console.log(props, ' this is data')
  }


  if(props.data.loading){
    return <p>Loading...</p>
  }

  if(props.data.error){
    return <p>{props.data.error.message}</p>
  }

  const contactList = props.data.contacts.map((contact) => {
    return <li key={contact.id}>
              {contact.firstName}
              {contact.lastName}
              <button onClick={deleteContact}>Delete</button>
          </li>
  })

  return (
    <ul>
      {contactList}
    </ul>
    )
}

export const contactsListQuery = gql`
  query {
    contacts {
      id
      firstName
      lastName
    }
  }
`
export const deleteMutation = gql`
  mutation {
    contacts {
      id
      firstName
      lastName
    }
  }
`



export default graphql(contactsListQuery)(Contacts);
