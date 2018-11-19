// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  if (!Accounts.findUserByEmail('prueba@gmail.com')) {
    Accounts.createUser({
      email: 'prueba@gmail.com',
      password: 'Hola1234',
      profile: {
        firstName: 'Prueba 1',
        lastName: 'Prueba 2',
        blocked: false,
        createAt: new Date()
      }
    });
  }
});
