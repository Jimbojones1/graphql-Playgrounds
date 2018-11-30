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
export const deleteContactMutation = gql`
  mutation deleteContact($id: ID!)
  {
    deleteContact(id: $id){
      message
    }
  }
`

// export const createContact = gql`
//   mutation addContact($firstName: String!, $lastName: String!){
//     addContact(firstName: $firstName, lastName: $lastName){
//       id
//       firstName
//       lastName
//     }
//   }
// `



export default compose(
  graphql(contactsListQuery),
  graphql(deleteContactMutation),
  )(Contacts);
