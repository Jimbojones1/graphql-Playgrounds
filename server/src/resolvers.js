const contacts = [
  {
    id: 1,
    firstName: 'Jim',
    lastName: 'Haff'
  },
  {
    id: 2,
    firstName: 'Maria',
    lastName: 'Sengle'
  },
  {
    id: 4,
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
      const newContact = { id: newId, firstName: firstName, lastName: lastName}
      contacts.push(newContact);
      return newContact
    },
  }

}
