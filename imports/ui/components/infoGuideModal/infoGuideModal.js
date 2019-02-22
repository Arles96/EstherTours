import './infoGuideModal.html';
import { Session } from 'meteor/session';
import '../../components/showRating/showRating';

Template.infoGuideModal.helpers({
  Guide: function () {
    return Session.get('guide');
  },
  urlTag: url => {
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  },
  textCategorization: function (text) {
    Session.set('showGuideRating', text);
    return 'Categorización';
  }
});
