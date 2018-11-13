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
    getAllContacts: () => {
      return contacts;
    },
  },
}
