// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  if (!Accounts.findUserByEmail('arles.cerrato@gmail.com')) {
    Accounts.createUser({
      email: 'arles.cerrato@gmail.com',
      password: 'Hola1234',
      profile: {
        firstName: 'Arles',
        lastName: 'Cerrato',
        blocked: false,
        createAt: new Date()
      }
    });
  }
});
