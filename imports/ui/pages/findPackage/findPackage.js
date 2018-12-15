import './findPackage.html';
import toastr from 'toastr';
import PackagesSchemaConsult from '../../../api/packages/packageConsult';
import { Guide } from '../../../api/guide/guide';
import { Hotels } from '../../../api/hotels/hotels';
import { RoomHotel } from '../../../api/hotels/roomhotel';
import { Renters } from '../../../api/renters/renters';
import { FleetRenter } from '../../../api/renters/fleetRenter';
import { Restaurants } from '../../../api/restaurants/restaurants';
import { TransportationEstablishments } from '../../../api/TransportationEstablishment/TransportationEstablishment';
import { RouteTransportationEstablishment } from '../../../api/TransportationEstablishment/RouteTransportationEstablishment';

Template.findPackage.helpers({
  PackagesSchemaConsult: () => PackagesSchemaConsult,
  Renters: () => (Renters.find().map(doc => ({
    label: `${doc.name}, ${doc.municipality}, ${doc.department}`,
    value: doc._id
  }))),
  Hotels: () => (Hotels.find().map(doc => ({
    label: `${doc.name}, ${doc.municipality}, ${doc.department}`,
    value: doc._id
  }))),
  Restaurants: () => (Restaurants.find().map(doc => ({
    label: `${doc.name}, ${doc.municipality}, ${doc.department}`,
    value: doc._id
  }))),
  TransportationEstablishments: () => (TransportationEstablishments.find().map(doc => ({
    label: `${doc.name}, ${doc.municipality}, ${doc.department}`,
    value: doc._id
  }))),
  Guide: () => (Guide.find().map(doc => ({
    label: `${doc.name}, ${doc.municipality}, ${doc.department}`,
    value: doc._id
  }))),
  RoomHotel: id => (RoomHotel.find({ idHotel: id }).map(doc => ({
    label: `${doc.type}, L. ${doc.price.toFixed(2)}`,
    value: doc._id
  }))),
  FleetRenter: id => (FleetRenter.find({ idRenter: id }).map(doc => ({
    label: `${doc.type}, L. ${doc.rate.toFixed(2)}`,
    value: doc._id
  }))),
  RouteTransportationEstablishment: id => (RouteTransportationEstablishment.find({
    idTransportationEstablishment: id
  }).map(doc => ({
    label: `${doc.city}, ${doc.type}`,
    value: doc._id
  })))
});

AutoForm.addHooks('consultPackagesForm', {
  onSuccess: function (formtype, result) {
    Session.set('resultFindPackage', result);
    Router.go('resultPackages');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
