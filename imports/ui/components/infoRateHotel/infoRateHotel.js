import './infoRateHotel.html';
import { Session } from 'meteor/session';

Template.infoRateHotel.helpers({
  rateHotel: () => {
    console.log(Session.get('rateHotel'));
    return Session.get('rateHotel');
  }
});
