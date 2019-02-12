import { Meteor } from 'meteor/meteor';
import { Hotels } from '../hotels';
import { RoomHotel } from '../roomhotel';

Meteor.publish('hotel.one', id => Hotels.find({ _id: id }));

Meteor.publish('hotels.all', () => Hotels.find());

Meteor.publish('hotels.main', () => Hotels.find({ isBranchOffice: false }));

Meteor.publish('RoomHotel.all', () => RoomHotel.find());
