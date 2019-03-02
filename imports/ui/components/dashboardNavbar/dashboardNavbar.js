import './dashboardNavbar.html';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Notifications } from '../../../api/Notifications/Notification';

Template.dashboardNavbar.onCreated(() => {
  Session.set('ChatPage-context', 'none');
});

Template.dashboardNavbar.helpers({
  getNotifications: () => Notifications.find({ idReceiver: Meteor.userId() }),
  hasNotifications: () => Notifications.find({ idReceiver: Meteor.userId() }).fetch().length > 0,
  cantNotifications: () => Notifications.find({ idReceiver: Meteor.userId() }).fetch().length,
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
  }
});

Template.dashboardNavbar.events({
  'click #logout': function () {
    Accounts.logout();
    window.location = '/';
  },
  'click .chatWithNotification': function (event) {
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
      }
    }
  }
});
