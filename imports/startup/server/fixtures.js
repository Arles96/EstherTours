// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { admin } from '../../api/roles/roles';

Meteor.startup(() => {
  if (!Accounts.findUserByEmail('dario@unitec.edu')) {
    const id = Accounts.createUser({
      email: 'dario@unitec.edu',
      password: 'hola',
      profile: {
        firstName: 'Dario',
        lastName: 'Mendoza',
        blocked: false,
        createAt: new Date()
      }
    });
    Roles.addUsersToRoles(id, admin);
  }
});
