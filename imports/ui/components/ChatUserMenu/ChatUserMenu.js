import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Chats } from '../../../api/Chats/Chats';
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
            : '1234'
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
  unread: id => Chats.find({ idReceiver: Meteor.userId(), idIssuer: id, status: 1 }).fetch().length
});

Template.chatUserMenu.events({
  'click .chatWith': function (event) {
    const openChats = Session.get('chatWith');
    if (openChats === undefined) {
      Session.set('chatWith', [event.target.id]);
    } else {
      Session.set('chatWith', (openChats.includes(event.target.id) ? openChats : openChats.concat(event.target.id)));
    }
  },
  'input .searchChatWith': function (event) {
    const data = event.target.value.split(' ').filter(item => item.trim() !== '')
      .map(val => ({
        $or: [
          { 'profile.firstName': { $regex: val.concat('.*') } },
          { 'profile.lastName': { $regex: val.concat('.*') } }
        ]
      }));
    Session.set('searchChatWith', (data.length > 0 ? data : `undefined`));
    Session.set('searchChatWithString', event.target.value.split(' ').filter(item => item.trim() !== ''));
  }
});
