import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';
import { Random } from 'meteor/random';
import { SSR } from 'meteor/meteorhacks:ssr';
import UserProfileSchema from './profileUsers';
import { admin, operator, consultant } from '../roles/roles';
import UpdateProfileSchema from './updateProfile';
import officeUsersSchema from './officeUser';

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
          position: doc.position,
          createdAt: new Date(),
          idOffice: doc.idOffice
        }
      });
      Roles.addUsersToRoles(user, doc.role);
      setTimeout(Meteor.bindEnvironment(() => {
        SSR.compileTemplate('userData', Assets.getText('Datos-Usuario.html'));
        const html = SSR.render('userData', {
          subject: 'Creación de usuario.',
          firstname: `${doc.firstName}`,
          email: doc.email,
          password: password
        });
        Email.send({
          from: 'aulio.maldonado@gmail.com',
          to: doc.email,
          subject: 'Creación de Usuario',
          html: html
        });
      }), 0);
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  actionBlockedUser: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), admin)) {
      if (!Roles.userIsInRole(doc._id, admin)) {
        Meteor.users.update({ _id: doc._id }, { $set: { 'profile.blocked': doc.blocked } });
      } else {
        throw new Meteor.Error('Error, no se puede bloquear a un administrador global');
      }
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  updateProfile: function (doc) {
    if (Meteor.user()) {
      UpdateProfileSchema.validate(doc);
      Meteor.users.update({ _id: Meteor.userId() }, {
        $set: {
          'profile.firstName': doc.firstName,
          'profile.lastName': doc.lastName,
          'profile.idOffice': doc.idOffice
        }
      });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  updateProfileOffice: function (doc) {
    const data = doc.modifier.$set;
    if (Roles.userIsInRole(Meteor.userId(), admin)) {
      officeUsersSchema.validate(data);
      Meteor.users.update({ _id: data.idUser }, {
        $set: {
          'profile.idOffice': data.idOffice
        }
      });
    } else {
      throw new Meteor.Error('Permiso Denegado.');
    }
  },
  updateUserProfileImage: function (image) {
    Meteor.users.update({ _id: Meteor.userId() }, {
      $set: {
        'profile.profileImage': image
      }
    });
  },
  reportUser: function (year) {
    if (Roles.userIsInRole(Meteor.userId(), operator) ||
      Roles.userIsInRole(Meteor.userId(), consultant) ||
      Roles.userIsInRole(Meteor.userId(), admin)
    ) {
      const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      Meteor.users.find().fetch().forEach(item => {
        const date = new Date(item.createAt);
        if (date.getFullYear() === year.year) {
          monthsCount[date.getMonth()] += 1;
        }
      });
      return monthsCount;
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  }
});
