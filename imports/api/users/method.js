import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';
import { Random } from 'meteor/random';
import UserProfileSchema from './profileUsers';

Meteor.methods({
  insertUser: function (doc) {
    UserProfileSchema.validate(doc);
    const password = Random.id(9);
    const user = Accounts.createUser({
      email: doc.email,
      password: password,
      profile: {
        firstName: doc.firstName,
        lastName: doc.lastName,
        blocked: false,
        createdAt: new Date()
      }
    });
    Roles.addUsersToRoles(user, doc.role);
    setTimeout(Meteor.bindEnvironment(() => {
      Email.send({
        from: 'aulio.maldonado@gmail.com',
        to: doc.email,
        text: `Te han creado un usuario en la plataform de Esther Tours y tu contraseña es ${password}`
      });
    }), 0);
  }
});
