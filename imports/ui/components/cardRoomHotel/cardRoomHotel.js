import './cardRoomHotel.html';
import { unpackageHotel } from '../../../startup/client/packageFunction';
import HotelImages from '../../../api/hotels/hotelImage';

Template.cardRoomHotel.events({
  'click #packageRemoveRoom': function () {
    unpackageHotel();
  }
});

Template.cardRoomHotel.helpers({
  findImg (_id) {
    return HotelImages.findOne({ _id });
  },
  first (index) {
    return index === 0;
  }
});
