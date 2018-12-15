// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { operator, consultant } from '../../api/roles/roles'; 

Meteor.startup(() => {
  if (!Accounts.findUserByEmail('tau@gmail.com')) {
    const id = Accounts.createUser({
      email: 'tau@gmail.com',
      password: 'holaa',
      profile: {
        firstName: 'CJ',
        lastName: 'Alvarez',
        blocked: false,
        createAt: new Date()
      }
    });
    Roles.addUsersToRoles(id, consultant);
  }
});
