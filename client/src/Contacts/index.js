import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from "graphql-tag";

const Contacts = ({data, mutate}) => {

  const deleteContact = (id, e) => {
    console.log(mutate, ' this is data')
  }


  if(data.loading){
    return <p>Loading...</p>
  }

  if(data.error){
    return <p>{data.error.message}</p>
  }

  const contactList = data.contacts.map((contact) => {
    return <li key={contact.id}>
              {contact.firstName}
              {contact.lastName}
              <button onClick={deleteContact.bind(null, this)}>Delete</button>
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
