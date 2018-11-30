import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from "graphql-tag";

const Contacts = ({data, mutate}) => {

  const deleteContact = (id, e) => {
    console.log(typeof id)
    mutate({
       variables: {id: parseInt(id)},
       update: (store, { data: { deleteContact }, error}) => {
            console.log(error, ' this is erroe')
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: contactsListQuery });
            // // Add our comment from the mutation to the end.
            console.log(data, ' data inside of update')
            data.contacts.splice(id, 1);
            // console.log(updatedList, ' this is it')
            // // // Write our data back to the cache.
            store.writeQuery({ query: contactsListQuery, data});
          },
    })
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
              <button onClick={deleteContact.bind(null, contact.id)}>Delete</button>
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
    deleteContact(id: $id)
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
