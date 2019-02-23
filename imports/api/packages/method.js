import { Meteor } from 'meteor/meteor';
import { Packages, PackagesSchema } from './packages';
import PackagesSchemaConsult from './packageConsult';
import { Guide } from '../guide/guide';
import { Hotels } from '../hotels/hotels';
import { RoomHotel } from '../hotels/roomhotel';
import { Renters } from '../renters/renters';
import { FleetRenter } from '../renters/fleetRenter';
import { Restaurants } from '../restaurants/restaurants';
import { TransportationEstablishments } from '../TransportationEstablishment/TransportationEstablishment';
import { RouteTransportationEstablishment } from '../TransportationEstablishment/RouteTransportationEstablishment';
import userActivities from '../userActivities/userActivities';

Meteor.methods({
  insertPackages: function (doc) {
    PackagesSchema.validate(doc);
    Packages.insert(doc);
    userActivities.insert({
      userId: Meteor.userId(),
      user: Meteor.user().profile.firstName,
      activity: 'agregó',
      collection: 'paquetes',
      registerId: '',
      register: doc.name,
      date: new Date()
    });
  },
  updatePackages: function (doc) {
    const data = doc.modifier.$set;
    const { _id } = doc;
    PackagesSchema.validate(data);
    Packages.update({ _id: _id }, {
      $set: data
    });
    userActivities.insert({
      userId: Meteor.userId(),
      user: Meteor.user().profile.firstName,
      activity: 'editó',
      collection: 'paquetes',
      registerId: _id,
      register: doc.name,
      date: new Date()
    });
  },
  deletePackage: function (id) {
    Packages.remove({ _id: id });
    userActivities.insert({
      userId: Meteor.userId(),
      user: Meteor.user().profile.firstName,
      activity: 'eliminó',
      collection: 'paquetes',
      registerId: '',
      register: '',
      date: new Date()
    });
  },
  findPackages: function (doc) {
    PackagesSchemaConsult.validate(doc);
    const query = JSON.parse(JSON.stringify(doc));
    if (query.name) {
      const regStr = query.name.split(/ /).join('|');
      const regex = new RegExp(regStr, 'i');
      query.name = { $regex: regex };
    }
    return { doc, query };
  },
  exportToCSV: function (query) {
    return convertArrayOfObjectsToCSV({
      data: Packages.find(
        query, {}
      ).fetch().map(item => ({
        Nombre: (item.name ? item.name : 'Indefinido'),
        Precio: item.price,
        Arrendadora: (item.idRenter ? Renters.findOne({
          _id: item.idRenter
        }, { name: 1 }).name : 'Indefinido'),
        'Flota de arrendadora': (item.idFleetRenter ? FleetRenter.findOne({
          _id: item.idFleetRenter
        }, { type: 1 }).type : 'Indefinido'),
        Transporte: (item.idTransport ? TransportationEstablishments.findOne({
          _id: item.idTransport
        }, { name: 1 }).name : 'Indefinido'),
        'Ruta de transporte': (item.idTransportRoute ? RouteTransportationEstablishment.findOne({
          _id: item.idTransportRoute
        }, { type: 1 }).type : 'Indefinido'),
        Hotel: (item.idHotel ? Hotels.findOne({
          _id: item.idHotel
        }, { name: 1 }).name : 'Indefinido'),
        'Habitación de hotel': (item.idRoom ? RoomHotel.findOne({
          _id: item.idRoom
        }, { type: 1 }).type : 'Indefinido'),
        Guía: (item.idGuide ? Guide.findOne({
          _id: item.idGuide
        }, { name: 1 }).name : 'Indefinido'),
        Restaurante: (item.idRestaurant ? Restaurants.findOne({
          _id: item.idRestaurant
        }, { name: 1 }).name : 'Indefinido'),
        Observación: (item.observation ? item.observation : 'Indefinido')
      }))
    });
  }
});

function convertArrayOfObjectsToCSV (args) {
  let result;
  let ctr = 0;

  const data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  const columnDelimiter = args.columnDelimiter || ',';
  const lineDelimiter = args.lineDelimiter || '\n';

  const keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(item => {
    ctr = 0;

    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];
      ctr++; // eslint-disable-line
    });
    result += lineDelimiter;
  });
  return result;
}
