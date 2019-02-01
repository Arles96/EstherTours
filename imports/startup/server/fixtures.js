//Fill the DB with example data on startup
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { admin } from '../../api/roles/roles';

Meteor.startup(() => {
  if (!Accounts.findUserByEmail('tazzad@hotmail.com')) {
    const id = Accounts.createUser({
      email: 'tazzad@hotmail.com',
      password: 'holaa',
      profile: {
        firstName: 'Ana',
        lastName: 'Gomez',
        blocked: false,
        createAt: new Date()
      }
    });
    Roles.addUsersToRoles(id, admin);
  }
});
