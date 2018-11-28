import { Meteor } from 'meteor/meteor';
import { TransportationEstablishments, TransportationEstablishmentSchema } from './TransportationEstablishment';

Meteor.methods({
  addTransportationEstablishment: function (doc) {
    TransportationEstablishmentSchema.validate(doc);
    TransportationEstablishments.insert(doc);
  }
});
