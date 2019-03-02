import { Meteor } from 'meteor/meteor';
import './ChatSide.html';
import '../Chat/Chat';
import '../ChatUserMenu/ChatUserMenu';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Notifications } from '../../../api/Notifications/Notification';

Template.chatSide.onCreated(() => {
  $(document).ready(() => {
    $('[data-toggle="tooltip"]').tooltip();
  });
  Session.set('chatWith', []);
  Session.set('chatWith_Backup', []);
  Session.set('counter', 0);
});

Template.chatSide.helpers({
  openChats: () => {
    let chats = Session.get('chatWith');
    let backup = Session.get('chatWith_Backup');

    backup = chats.filter((item, index) => index > 1);
    chats = chats.filter((item, index) => index < 2);

    Session.set('chatWith_Backup', backup);

    const contextData = chats.map(item => ({
      Issuer: Meteor.users.findOne({ _id: item }),
      Receiver: Meteor.user()
    }));
    return contextData;
  },
  getBackups: () => {
    const backups = Session.get('chatWith_Backup');
    const querty = backups.map(id => ({
      _id: id
    }));
    const result = Meteor.users.find({
      _id: { $not: Meteor.userId() },
      $or: querty
    });
    return result;
  },
  hasNotifications: id => Notifications.find({ idIssuer: id }).fetch().length > 0,
  cantNotifications: id => Notifications.findOne({
    idIssuer: id,
    idReceiver: Meteor.userId()
  }).amount,
  maxOpenChats: () => {
    if (Object.keys(Session.get('chatWith')).length > 2) {
      return true;
    }
    Session.set('counter', 0);
    return false;
  },
  leftArrow: () => {
    const counter = Session.get('counter');
    const sessionCounter = Object.keys(Session.get('chatWith')).length;
    return counter < (sessionCounter - 2);
  },
  rightArrow: () => {
    const counter = Session.get('counter');
    return counter > 0;
  }
});

Template.chatSide.events({
  'click #leftArrow': function (event) {
    const counter = Session.get('counter');
    const chats = Session.get('chatWith');
    const firstChat = chats[0];
    const filteredChats = chats.filter(item => item !== firstChat);
    Session.set('counter', counter + 1);
    Session.set('chatWith', filteredChats.concat(firstChat));
  },
  'click #rightArrow': function (event) {
    const counter = Session.get('counter');
    const chats = Session.get('chatWith');
    const lastChat = chats[chats.length - 1];
    const filteredChats = chats.filter(item => item !== lastChat);
    Session.set('counter', counter - 1);
    Session.set('chatWith', [lastChat].concat(filteredChats));
  },
  'click .menu-backup': function (event) {
    const chats = Session.get('chatWith');
    const current = event.currentTarget.id;
    const filteredChats = chats.filter(item => item !== current);
    Session.set('chatWith', [current].concat(filteredChats));
  },
  'click .closeChat': function (event) {
    const openChats = Session.get('chatWith');
    Session.set('chatWith', openChats.filter(item => item !== event.currentTarget.id));
  }
});
