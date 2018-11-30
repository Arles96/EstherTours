import './infoGuideModal.html';
import { Session } from 'meteor/session';

Template.infoGuideModal.helpers({
  Guide: function () {
    return Session.get('guide');
  }
});
