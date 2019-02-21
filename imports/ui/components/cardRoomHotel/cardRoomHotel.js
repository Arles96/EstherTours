import './cardRoomHotel.html';
import { unpackageHotel } from '../../../startup/client/packageFunction';

Template.cardRoomHotel.events({
  'click #packageRemoveRoom': function () {
    unpackageHotel();
  }
});
