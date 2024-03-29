import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Notifications } from '../../../api/Notifications/Notification';
import './ChatUserMenu.html';

Template.chatUserMenu.onCreated(() => {
  Session.set('isUsing', false);
  Session.set('isOpen', false);
});
Template.chatUserMenu.helpers({
  connectedUsers: () => {
    const result = Meteor.users.find({
      _id: { $not: Meteor.userId() },
      $or:
        (`${Session.get('searchChatWith')}` !== `undefined`
          ? Session.get('searchChatWith')
          : [{}]
        ),
      'status.online': true
    });
    if (`${Session.get('searchChatWithString')}` !== `undefined` && Session.get('searchChatWithString').length > 1) {
      const idComplete = result.fetch().map(item => ({
        _id: (
          item.profile.firstName.concat(' ').concat(item.profile.lastName).includes(Session.get('searchChatWithString').join().replace(',', ' '))
            ? item._id
            : ''
        )
      }));
      if (idComplete.length > 0) {
        return Meteor.users.find({
          $or: idComplete
        });
      }
    }
    return result;
  },
  disconnectedUsers: () => {
    const result = Meteor.users.find({
      _id: { $not: Meteor.userId() },
      $or:
        (`${Session.get('searchChatWith')}` !== `undefined`
          ? Session.get('searchChatWith')
          : [{}]
        ),
      'status.online': false
    });
    if (`${Session.get('searchChatWithString')}` !== `undefined` && Session.get('searchChatWithString').length > 1) {
      const idComplete = result.fetch().map(item => ({
        _id: (
          item.profile.firstName.concat(' ').concat(item.profile.lastName).includes(Session.get('searchChatWithString').join().replace(',', ' '))
            ? item._id
            : ''
        )
      }));
      if (idComplete.length > 0) {
        return Meteor.users.find({
          $or: idComplete
        });
      }
    }
    return result;
  },
  hasNotifications: id => {
    const query = Notifications.find({
      idIssuer: id,
      idReceiver: Meteor.userId()
    });
    if (query) {
      return query.count() > 0;
    }
    return false;
  },
  cantNotifications: id => {
    const query = Notifications.findOne({
      idIssuer: id,
      idReceiver: Meteor.userId()
    });
    if (query) {
      return query.amount;
    }
    return 0;
  },
  isUsing: () => Session.get('isUsing') || Session.get('isOpen')
});

Template.chatUserMenu.events({
  'click .chatWith': function (event) {
    if (event.currentTarget.id) {
      const openChats = Session.get('chatWith');
      if (openChats === undefined) {
        Session.set('chatWith', [event.currentTarget.id]);
      } else {
        Session.set('chatWith', (openChats.includes(event.currentTarget.id) ? openChats : openChats.concat(event.currentTarget.id)));
      }
      const query = {
        idReceiver: Meteor.userId(),
        idIssuer: event.currentTarget.id
      };
      if (Notifications.findOne(query)) {
        Meteor.call('lookMessage', query);
      }
    }
  },
  'input .searchChatWith': function (event) {
    const data = event.currentTarget.value.split(' ').filter(item => item.trim() !== '')
      .map(val => ({
        $or: [
          { 'profile.firstName': { $regex: new RegExp(val.concat('.*'), 'i') } },
          { 'profile.lastName': { $regex: new RegExp(val.concat('.*'), 'i') } }
        ]
      }));
    Session.set('searchChatWith', (data.length > 0 ? data : `undefined`));
    Session.set('searchChatWithString', event.currentTarget.value.split(' ').filter(item => item.trim() !== ''));
  },
  'click .Menu_Chat_Text': function (event) {
    Session.set('isOpen', !Session.get('isOpen'));
  },
  'mouseenter .Menu_Chat_Text': function (event) {
    Session.set('isUsing', true);
  },
  'mouseleave .Menu_Chat_Text': function (event) {
    Session.set('isUsing', false);
  }
});
