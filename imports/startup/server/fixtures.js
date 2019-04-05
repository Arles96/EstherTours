// Fill the DB with example data on startup
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { admin } from '../../api/roles/roles';

Meteor.startup(() => {
  if (!Accounts.findUserByEmail('pruebaOperador@gmail.com')) {
    const id = Accounts.createUser({
      email: 'pruebaOperador@gmail.com',
      password: 'hola1234',
      profile: {
        firstName: 'Operador',
        lastName: 'Espinoza',
        blocked: false,
        createAt: new Date()
      }
    });
    Roles.addUsersToRoles(id, admin);
  }
});
