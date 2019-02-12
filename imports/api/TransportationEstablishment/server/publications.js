import { Meteor } from 'meteor/meteor';
import { TransportationEstablishments } from '../TransportationEstablishment';
import { RouteTransportationEstablishment } from '../RouteTransportationEstablishment';
import { FleetTransportationEstablishment } from '../FleetTransportationEstablishment';

Meteor.publish('TransportationEstablishment.one', id => TransportationEstablishments.find({ _id: id }));

Meteor.publish('transport.all', () => TransportationEstablishments.find());

Meteor.publish('Routes.all', () => RouteTransportationEstablishment.find());

Meteor.publish('FleetTransportationEstablishment.all', () => FleetTransportationEstablishment.find());
