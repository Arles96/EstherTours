import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Chats, ChatSchema } from '../../../api/Chats/Chats';
import './Chat.html';
import { Notifications } from '../../../api/Notifications/Notification';

Template.chat.onCreated(() => {
  Session.set(`limitChat${Template.currentData().contextData.Issuer._id}`, 10);
  Session.set(`skipChat${Template.currentData().contextData.Issuer._id}`, 1);
  Session.set(`countChat${Template.currentData().contextData.Issuer._id}`, 0);
});

Template.chat.helpers({
  ChatSchema: () => ChatSchema,
  idReceiver: Meteor.userId(),
  messages:
    () => Chats.find(
      {
        $or: [{
          idReceiver: Meteor.userId(),
          idIssuer: Template.currentData().contextData.Issuer._id
        },
        {
          idIssuer: Meteor.userId(),
          idReceiver: Template.currentData().contextData.Issuer._id
        }]
      }, {
        skip: Session.get(`skipChat${Template.currentData().contextData.Issuer._id}`) * Session.get(`limitChat${Template.currentData().contextData.Issuer._id}`) * -1
      }
    ),
  isReceiver: id => {
    if (document.getElementById(`ChatHeader${Template.currentData().contextData.Issuer._id}`)) {
      if (document.getElementById(`ChatHeader${Template.currentData().contextData.Issuer._id}`).getAttribute('aria-expanded') === 'true') {
        const query = {
          idReceiver: Meteor.userId(),
          idIssuer: Template.currentData().contextData.Issuer._id
        };
        if (Notifications.findOne(query)) {
          Meteor.call('lookMessage', query);
        }
      }
    }
    return Template.currentData().contextData.Receiver._id === id;
  },
  moreMessages: () => {
    const query = Chats.find(
      {
        $or: [{
          idReceiver: Meteor.userId(),
          idIssuer: Template.currentData().contextData.Issuer._id
        },
        {
          idIssuer: Meteor.userId(),
          idReceiver: Template.currentData().contextData.Issuer._id
        }]
      }
    );
    if (query) {
      Session.set(`countChat${Template.currentData().contextData.Issuer._id}`, query.count());
      return Session.get(`skipChat${Template.currentData().contextData.Issuer._id}`) * Session.get(`limitChat${Template.currentData().contextData.Issuer._id}`) < Session.get(`countChat${Template.currentData().contextData.Issuer._id}`);
    }
    return false;
  },
  isSent: status => status === 1,
  isReceived: status => status === 2,
  isRead: status => status === 3
});

Template.chat.events({
  'click .sendMessage': function (event) {
    const message = document.getElementById('ChatPage-message').value;
    const query = {
      idReceiver: Template.currentData().contextData.Issuer._id,
      idIssuer: Meteor.userId(),
      message: message,
      status: 1,
      createAt: () => new Date()
    };
    Meteor.call('sendMessage', query, (error, result) => {
      if (!error) {
        document.getElementById('ChatPage-message').value = '';
      }
    });
  },
  'click .closeChat': function (event) {
    const openChats = Session.get('chatWith');
    Session.set('chatWith', openChats.filter(item => item !== Template.currentData().contextData.Issuer._id));
  },
  'click .ChatHeader': function (event) {
    if (document.getElementById(`ChatHeader${Template.currentData().contextData.Issuer._id}`).getAttribute('aria-expanded') === 'false') {
      const query = {
        idReceiver: Meteor.userId(),
        idIssuer: Template.currentData().contextData.Issuer._id
      };
      if (Notifications.findOne(query)) {
        Meteor.call('lookMessage', query);
      }
    }
  },
  'keydown #ChatPage-message': function (event) {
    if (event.which === 13 && !event.originalEvent.shiftKey) {
      const message = document.getElementById('ChatPage-message').value;
      const query = {
        idReceiver: Template.currentData().contextData.Issuer._id,
        idIssuer: Meteor.userId(),
        message: message,
        status: 1,
        createAt: () => new Date()
      };
      Meteor.call('sendMessage', query, (error, result) => {
        if (!error) {
          document.getElementById('ChatPage-message').value = '';
        }
      });
      event.stopPropagation();
      return false;
    }
    return true;
  },
  'click .moreMessages_Label': function (event) {
    Session.set(`skipChat${Template.currentData().contextData.Issuer._id}`, Session.get(`skipChat${Template.currentData().contextData.Issuer._id}`) + 1);
  }
});
