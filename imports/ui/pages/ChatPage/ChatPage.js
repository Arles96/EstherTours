import './ChatPage.html';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Notifications } from '../../../api/Notifications/Notification';
import { Chats, ChatSchema } from '../../../api/Chats/Chats';

Template.chatPage.onCreated(function createVars() {
  this.currentIssuerId = new ReactiveVar('none');
});

Template.chatPage.helpers({
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
  ChatSchema: () => ChatSchema,
  idReceiver: Meteor.userId(),
  messages:
    () => Chats.find({
      $or: [{
        idReceiver: Meteor.userId(),
        idIssuer: Template.instance().currentIssuerId.get()
      },
      {
        idIssuer: Meteor.userId(),
        idReceiver: Template.instance().currentIssuerId.get()
      }]
    }),
  isReceiver: id => {
    const query = {
      idReceiver: Meteor.userId(),
      idIssuer: Template.instance().currentIssuerId.get()
    };
    if (Notifications.findOne(query)) {
      Meteor.call('lookMessage', query);
    }
    return Meteor.userId() === id;
  },
  isStartPage: () => {
    const context = Session.get('ChatPage-context');
    if (context !== 'none') {
      Session.set('ChatPage-context', 'none');
      Template.instance().currentIssuerId.set(context);
    }
    return Template.instance().currentIssuerId.get() === 'none';
  },
  getReceiver: () => Meteor.user(),
  getIssuer: function (option) {
    const issuer = Meteor.users.findOne({ _id: Template.instance().currentIssuerId.get() });
    if (issuer) {
      switch (option) {
        case 'id': return issuer._id;
        case 'firstName': return issuer.profile.firstName;
        case 'lastName': return issuer.profile.lastName;
        case 'status': return issuer.status.online;
        default: return false;
      }
    }
    return null;
  },
  cantNotifications: id => {
    const query = Notifications.findOne({
      idIssuer: id,
      idReceiver: Meteor.userId()
    });
    if (query) {
      return query.amount;
    }
    return null;
  },
  lastMessage: id => {
    const query = Chats.find(
      {
        $or: [{
          idReceiver: Meteor.userId(),
          idIssuer: id
        },
        {
          idIssuer: Meteor.userId(),
          idReceiver: id
        }]
      }, {
        sort: {
          DateTime: -1, limit: 1
        }
      }
    ).fetch().pop();
    if (query) {
      if (query.idIssuer === Meteor.userId()) {
        return `Tú: ${query.message}`;
      } else {
        return query.message;
      }
    }
    return null;
  },
  lastMessageId: id => {
    const query = Chats.find(
      {
        $or: [{
          idReceiver: Meteor.userId(),
          idIssuer: id
        },
        {
          idIssuer: Meteor.userId(),
          idReceiver: id
        }]
      }, {
        sort: {
          DateTime: -1, limit: 1
        }
      }
    ).fetch().pop();
    if (query) {
      return query.idIssuer;
    }
    return null;
  },
  getStatus: id => {
    const query = Chats.find(
      {
        $or: [{
          idReceiver: Meteor.userId(),
          idIssuer: id
        },
        {
          idIssuer: Meteor.userId(),
          idReceiver: id
        }]
      }, {
        sort: {
          DateTime: -1, limit: 1
        }
      }
    ).fetch().pop();
    if (query) {
      return query.status;
    }
    return null;
  },
  isSent: status => status === 1,
  isReceived: status => status === 2,
  isRead: status => status === 3
});

Template.chatPage.events({
  'click .sendMessage': function (event) {
    const message = document.getElementById('ChatPage-message').value;
    const query = {
      idReceiver: Template.instance().currentIssuerId.get(),
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
  'click .chatWith': function (event) {
    if (event.currentTarget.id) {
      Template.instance().currentIssuerId.set(event.currentTarget.id);
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
          { 'profile.firstName': { $regex: val.concat('.*') } },
          { 'profile.lastName': { $regex: val.concat('.*') } }
        ]
      }));
    Session.set('searchChatWith', (data.length > 0 ? data : `undefined`));
    Session.set('searchChatWithString', event.currentTarget.value.split(' ').filter(item => item.trim() !== ''));
  },
  'keydown #ChatPage-message': function (event) {
    if (event.which === 13 && !event.originalEvent.shiftKey) {
      const message = document.getElementById('ChatPage-message').value;
      const query = {
        idReceiver: Template.instance().currentIssuerId.get(),
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
  }
});
