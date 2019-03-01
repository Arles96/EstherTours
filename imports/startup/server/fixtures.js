// Fill the DB with example data on startup
 import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { consultant } from '../../api/roles/roles'; 

 Meteor.startup(() => {
  if (!Accounts.findUserByEmail('cons2@gmail.com')) {
    const id = Accounts.createUser({
      email: 'cons2@gmail.com',
      password: 'cons2',
      profile: {
        firstName: 'Cons2',
        lastName: 'Cambrai',
        blocked: false,
        createAt: new Date()
      }
    });
    Roles.addUsersToRoles(id, consultant);
  }
}); 
