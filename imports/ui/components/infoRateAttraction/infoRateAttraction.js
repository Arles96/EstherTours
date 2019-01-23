import './infoRateAttraction.html';
import { Session } from 'meteor/session';

Template.infoRateAttraction.helpers({
  rateAttraction: () => {
    console.log(Session.get('rateAttraction'));
    return Session.get('rateAttraction');
  }
});
