// Fill the DB with example data on startup
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { consultant, admin } from '../../api/roles/roles';

Meteor.startup(() => {
  if (!Accounts.findUserByEmail('cesardavide1503@gmail.com')) {
    const id = Accounts.createUser({
      email: 'cesardavide1503@gmail.com',
      password: 'hola1234',
      profile: {
        firstName: 'Cesar',
        lastName: 'Espinoza',
        blocked: false,
        createAt: new Date()
      }
    });
    Roles.addUsersToRoles(id, admin);
  }
});
