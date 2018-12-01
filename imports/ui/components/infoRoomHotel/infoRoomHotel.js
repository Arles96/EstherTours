import './infoRoomHotel.html';
import { Session } from 'meteor/session';

Template.infoRoomHotel.helpers({
  roomHotel: () => {
    console.log(Session.get('roomHotel'));
    return Session.get('roomHotel');
  }
});
