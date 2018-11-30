// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { operator } from '../../api/roles/roles';

Meteor.startup(() => {
<<<<<<< HEAD
  if (!Accounts.findUserByEmail('cj@gmail.com')) {
    const id = Accounts.createUser({
      email: 'cj@gmail.com',
=======
  if (!Accounts.findUserByEmail('anagmar98@gmail.com')) {
    const id = Accounts.createUser({
      email: 'anagmar98@gmail.com',
>>>>>>> ec1e561753d8940e5248e7fc99d1d5fca4442313
      password: 'holaa',
      profile: {
        firstName: 'CJ',
        lastName: 'Alvarez',
        blocked: false,
        createAt: new Date()
      }
    });
    Roles.addUsersToRoles(id, operator);
  }
});
