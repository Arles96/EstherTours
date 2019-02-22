import { Meteor } from 'meteor/meteor';
import './Chat.html';

Template.chat.helpers({
  id: Meteor.userId()
});

Template.chat.events({
});
