import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import './Chat.html';

Template.chat.onCreated(() => {
});

Template.chat.helpers({
  id: Meteor.userId()
});

Template.chat.events({
  'click .closeChat': function (event) {
    const openChats = Session.get('chatWith');
    Session.set('chatWith', openChats.filter(item => item !== this.contextData.Issuer._id));
  }
});
