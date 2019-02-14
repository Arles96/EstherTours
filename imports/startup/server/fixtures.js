// Fill the DB with example data on startup
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { admin , operator} from '../../api/roles/roles';

Meteor.startup(() => {
  if (!Accounts.findUserByEmail('tamals@gmail.com')) {
    const id = Accounts.createUser({
      email: 'tamals@gmail.com',
      password: 'holaa',
      profile: {
        firstName: 'Tamalera',
        lastName: 'Cambrai',
        blocked: false,
        createAt: new Date()
      }
    });
    Roles.addUsersToRoles(id, operator);
  }
});
