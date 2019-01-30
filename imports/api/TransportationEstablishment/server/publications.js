import { Meteor } from 'meteor/meteor';
import { TransportationEstablishments } from '../TransportationEstablishment';
import { RouteTransportationEstablishment } from '../RouteTransportationEstablishment';
import TransportationImage from '../transportationImage';

Meteor.publish('TransportationEstablishment.one', id => TransportationEstablishments.find({ _id: id }));

Meteor.publish('transport.all', () => TransportationEstablishments.find());

Meteor.publish('Routes.all', () => RouteTransportationEstablishment.find());

Meteor.publish('transportationImage.all', () => TransportationImage.find().cursor);
