import './infoGuideModal.html';
import { Session } from 'meteor/session';

Template.infoGuideModal.helpers({
  Guide: function () {
    return Session.get('guide');
  },
  urlTag: url => {
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  }
});
