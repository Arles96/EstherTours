import { Meteor } from 'meteor/meteor';
import './ChatSide.html';
import '../Chat/Chat';
import '../ChatUserMenu/ChatUserMenu';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.chatSide.onCreated(() => {
  Session.set('chatWith', []);
});

Template.chatSide.helpers({
  openChats: () => {
    const contextData = Session.get('chatWith').map(item => ({
      Issuer: Meteor.users.findOne({ _id: item }),
      Receiver: Meteor.user()
    }));
    return contextData;
  }
});

Template.chatSide.events({
});
