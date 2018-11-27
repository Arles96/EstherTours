import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';
import { Random } from 'meteor/random';
import UserProfileSchema from './profileUsers';
import { admin } from '../roles/roles';
import UpdateProfileSchema from './updateProfile';

Meteor.methods({
  insertUser: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), admin)) {
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
          subject: 'Creación de Usuario',
          text: `Te han creado un usuario en la plataform de Esther Tours y tu contraseña es ${password}`
        });
      }), 0);
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  actionBlockedUser: function (doc) {
    if (!Roles.userIsInRole(doc._id, admin)) {
      Meteor.users.update({ _id: doc._id }, { $set: { 'profile.blocked': doc.blocked } });
    } else {
      throw new Meteor.Error('Error, no se puede bloquear a un administrador global');
    }
  },
  updateProfile: function (doc) {
    if (Meteor.user()) {
      UpdateProfileSchema.validate(doc);
      Meteor.users.update({ _id: Meteor.userId() }, {
        $set: {
          'profile.firstName': doc.firstName,
          'profile.lastName': doc.lastName
        }
      });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  }
});
