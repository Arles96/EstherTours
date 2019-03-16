import './dashboardNavbar.html';
import '../namePackageModal/namePackageModal';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import $ from 'jquery';
import { Notifications } from '../../../api/Notifications/Notification';
import { clearValues, setValues } from '../../../startup/client/packageFunction';

Template.dashboardNavbar.onCreated(() => {
  Session.set('ChatPage-context', 'none');
  setValues();
});

Template.dashboardNavbar.helpers({
  username: () => {
    const query = Meteor.user();
    if (query) {
      return `${query.profile.firstName} ${query.profile.lastName}`;
    }
    return null;
  },
  role: () => {
    const query = Meteor.user();
    if (query) {
      return query.roles;
    }
    return null;
  },
  getNotifications: () => Notifications.find({ idReceiver: Meteor.userId() }),
  hasNotifications: () => {
    const query = Notifications.find({ idReceiver: Meteor.userId() });
    if (query) {
      return query.count() > 0;
    }
    return false;
  },
  cantNotifications: () => {
    const query = Notifications.find({ idReceiver: Meteor.userId() });
    if (query) {
      return query.count();
    }
    return 0;
  },
  getIssuer: function (id) {
    const issuer = Meteor.users.findOne({ _id: id });
    if (issuer) {
      const query = {
        idReceiver: Meteor.userId(),
        idIssuer: id
      };
      if (Notifications.findOne(query)) {
        Meteor.call('recieveMessage', query);
      }
      return `${issuer.profile.firstName} ${issuer.profile.lastName}`;
    }
    return null;
  },
  landscape: () => window.innerWidth > 780 && window.innerWidth > window.innerHeight
});

Template.dashboardNavbar.events({
  'click #exit': function () {
    const userId = Meteor.userId();
    Meteor.call('userLogout2', userId, (error, result) => {
      if (!error) {
        Accounts.logout();
        Router.go('/');
      }
    });
  },
  'click .chatWithNotification': function (event) {
    Session.set('limitChatPage', 10);
    Session.set('skipChatPage', 1);

    if (event.currentTarget.id) {
      if (document.getElementById('chatPage')) {
        Session.set('ChatPage-context', event.currentTarget.id);
        const query = {
          idReceiver: Meteor.userId(),
          idIssuer: event.currentTarget.id
        };
        if (Notifications.findOne(query)) {
          Meteor.call('lookMessage', query);
        }
      } else {
        const openChats = Session.get('chatWith');
        if (openChats === undefined) {
          Session.set('chatWith', [event.currentTarget.id]);
        } else {
          Session.set('chatWith', (openChats.includes(event.currentTarget.id) ? openChats : openChats.concat(event.currentTarget.id)));
        }
        if (document.getElementById(`ChatHeader${event.currentTarget.id}`)) {
          if (document.getElementById(`ChatHeader${event.currentTarget.id}`).getAttribute('aria-expanded') === 'true') {
            const query = {
              idReceiver: Meteor.userId(),
              idIssuer: event.currentTarget.id
            };
            if (Notifications.findOne(query)) {
              Meteor.call('lookMessage', query);
            }
          } else {
            document.getElementById(`ChatHeader${event.currentTarget.id}`).click();
          }
        } else {
          const query = {
            idReceiver: Meteor.userId(),
            idIssuer: event.currentTarget.id
          };
          if (Notifications.findOne(query)) {
            Meteor.call('lookMessage', query);
          }
        }
      }
    }
  },
  'click #createPackage': function () {
    $('#namePackageModal').modal('show');
  },
  'click #deletePackage': function () {
    clearValues();
  }
});
