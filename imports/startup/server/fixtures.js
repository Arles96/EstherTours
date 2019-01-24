//Fill the DB with example data on startup
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { operator } from '../../api/roles/roles';

Meteor.startup(() => {
  if (!Accounts.findUserByEmail('ta@hotmail.com')) {
    const id = Accounts.createUser({
      email: 'ta@hotmail.com',
      password: 'holaa',
      profile: {
        firstName: 'Ana',
        lastName: 'Gomez',
        blocked: false,
        createAt: new Date()
      }
    });
    Roles.addUsersToRoles(id, operator);
  }
});
