import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Chats, ChatSchema } from '../../../api/Chats/Chats';
import './Chat.html';

Template.chat.onCreated(() => {

});

Template.chat.helpers({
  ChatSchema: () => ChatSchema,
  idReceiver: Meteor.userId(),
  messages:
    () => {
      if (Template.currentData().contextData.Issuer) {
        return Chats.find({
          $or: [{
            idReceiver: Meteor.userId(),
            idIssuer: Template.currentData().contextData.Issuer._id
          },
          {
            idIssuer: Meteor.userId(),
            idReceiver: Template.currentData().contextData.Issuer._id
          }]
        });
      }
      return null;
    },
  isReceiver: id => {
    if (document.getElementById(`ChatHeader${Template.currentData().contextData.Issuer._id}`)) {
      if (document.getElementById(`ChatHeader${Template.currentData().contextData.Issuer._id}`).getAttribute('aria-expanded') === 'true') {
        Meteor.call('lookMessage', {
          idReceiver: Meteor.userId(),
          idIssuer: Template.currentData().contextData.Issuer._id
        });
      }
    }
    return Template.currentData().contextData.Receiver._id === id;
  }
});

Template.chat.events({
  'click .closeChat': function (event) {
    const openChats = Session.get('chatWith');
    Session.set('chatWith', openChats.filter(item => item !== Template.currentData().contextData.Issuer._id));
  },
  'click .ChatHeader': function (event) {
    if (document.getElementById(`ChatHeader${Template.currentData().contextData.Issuer._id}`).getAttribute('aria-expanded') === 'false') {
      Meteor.call('lookMessage', {
        idReceiver: Meteor.userId(),
        idIssuer: Template.currentData().contextData.Issuer._id
      });
    }
  }
});
