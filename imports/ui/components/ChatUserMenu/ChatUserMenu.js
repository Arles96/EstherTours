import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Notifications } from '../../../api/Notifications/Notification';
import './ChatUserMenu.html';

Template.chatUserMenu.helpers({
  listUsers: () => {
    const result = Meteor.users.find({
      _id: { $not: Meteor.userId() },
      $or:
        (`${Session.get('searchChatWith')}` !== `undefined`
          ? Session.get('searchChatWith')
          : [{}]
        )
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
  hasNotifications: id => Notifications.find({ idIssuer: id }).fetch().length > 0,
  cantNotifications: id => Notifications.findOne({
    idIssuer: id,
    idReceiver: Meteor.userId()
  }).amount
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
    }
  },
  'input .searchChatWith': function (event) {
    const data = event.currentTarget.value.split(' ').filter(item => item.trim() !== '')
      .map(val => ({
        $or: [
          { 'profile.firstName': { $regex: val.concat('.*') } },
          { 'profile.lastName': { $regex: val.concat('.*') } }
        ]
      }));
    Session.set('searchChatWith', (data.length > 0 ? data : `undefined`));
    Session.set('searchChatWithString', event.currentTarget.value.split(' ').filter(item => item.trim() !== ''));
  }
});
