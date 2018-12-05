let contacts = [
  {
    id: 0,
    firstName: 'Jim',
    lastName: 'Haff'
  },
  {
    id: 1,
    firstName: 'Maria',
    lastName: 'Sengle'
  },
  {
    id: 2,
    firstName: 'Kate',
    lastName: 'yan'
  }
];

export const resolvers = {
  Query: {
    contacts: () => {
      return contacts;
    },
  },
  Mutation: {
    addContact: (root, {firstName, lastName}) => {
      const newId = require('crypto').randomBytes(5).toString('hex');
      const newContact = { id: contacts.length, firstName: firstName, lastName: lastName}
      contacts.push(newContact);
      return newContact;
    },
    deleteContact: (root, {id})=> {
      console.log(id, ' id')
      contacts.splice(id, 1);
      console.log(contacts, 'this is contacts')
      return 'Successfully deleted';
    },
    editContact: (root, {id, contact}) => {
      console.log(id, contact);
      contacts[id] = contact;

      return contact;
    },
  }

}
