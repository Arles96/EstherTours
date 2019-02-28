// Fill the DB with example data on startup
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { operator } from '../../api/roles/roles'; 

Meteor.startup(() => {
  if (!Accounts.findUserByEmail('operr@gmail.com')) {
    const id = Accounts.createUser({
      email: 'operr@gmail.com',
      password: 'operr',
      profile: {
        firstName: 'Operador 2',
        lastName: 'Cambrai',
        blocked: false,
        createAt: new Date()
      }
    });
    Roles.addUsersToRoles(id, operator);
  }
});
