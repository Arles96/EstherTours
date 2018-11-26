import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { RestaurantSchema, Restaurants } from './AddRestaurants';
import { operator } from '../roles/roles';

Meteor.methods({
  insertRestaurant: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      RestaurantSchema.validate(doc);
      const user = Restaurants.createUser({
        email: doc.email,
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
    if (!Roles.userIsInRole(doc._id, operator)) {
      Meteor.users.update({ _id: doc._id }, { $set: { 'profile.blocked': doc.blocked } });
    } else {
      throw new Meteor.Error('Error, no se puede bloquear a un operatoristrador global');
    }
  }
});
