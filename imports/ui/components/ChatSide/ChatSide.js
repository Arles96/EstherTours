import { Meteor } from 'meteor/meteor';
import './ChatSide.html';
import '../Chat/Chat';
import '../ChatUserMenu/ChatUserMenu';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.chatSide.onCreated(() => {
  Session.set('chatWith', []);
  Session.set('counter', 0);
});

Template.chatSide.helpers({
  openChats: () => {
    const contextData = Session.get('chatWith').map(item => ({
      Issuer: Meteor.users.findOne({ _id: item }),
      Receiver: Meteor.user()
    }));
    return contextData;
  },
  maxOpenChats: () => Object.keys(Session.get('chatWith')).length > 2,
  leftArrow: () => Session.get('counter') > 1 && Session.get('counter') < (Object.keys(Session.get('chatWith')).length > 2) - 2,
  rightArrow: () => Session.get('counter') < (Object.keys(Session.get('chatWith')).length > 2) - 2 && Session.get('counter') > 0
});

Template.chatSide.events({
  'click .leftArrow': function (event) {
    Session.set('counter', Session.get('counter') + 1);
    const openChats = Session.get('chatWith');
    Session.set('chatWith', openChats.filter(item => item !== openChats[0]));
    Session.set('chatWith', openChats[0]);
  },
  'click .rightArrow': function (event) {
    Session.set('counter', Session.get('counter') + 1);
    const openChats = Session.get('chatWith');
    Session.set('chatWith', openChats.filter(item => item !== openChats[openChats.length - 1]));
    Session.set('chatWith', openChats[openChats.length - 1].concat(openChats.filter(item => item !== openChats[openChats.length - 1])));
  }
});
