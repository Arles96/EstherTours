import { Meteor } from 'meteor/meteor';
import { Hotels } from '../hotels';
import { RoomHotel } from '../roomhotel';
import HotelImage from '../hotelImage';

Meteor.publish('hotel.one', id => Hotels.find({ _id: id }));

Meteor.publish('hotels.all', () => Hotels.find());

Meteor.publish('RoomHotel.all', () => RoomHotel.find());

Meteor.publish('hotelImage.all', () => HotelImage.find().cursor);
