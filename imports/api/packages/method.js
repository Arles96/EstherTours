import { Meteor } from 'meteor/meteor';
import { Packages, PackagesSchema } from './packages';
import { operator, consultant, admin } from '../roles/roles';
import PackagesSchemaConsult from './packageConsult';
import { Guide } from '../guide/guide';
import { Hotels } from '../hotels/hotels';
import { RoomHotel } from '../hotels/roomhotel';
import { Renters } from '../renters/renters';
import { FleetRenter } from '../renters/fleetRenter';
import { Restaurants } from '../restaurants/restaurants';
import { TransportationEstablishments } from '../TransportationEstablishment/TransportationEstablishment';
import { RouteTransportationEstablishment } from '../TransportationEstablishment/RouteTransportationEstablishment';
import { SoldPackage, SoldPackageSchema } from './soldPackage';

Meteor.methods({
  insertPackages: function (doc) {
    PackagesSchema.validate(doc);
    Packages.insert(doc);
  },
  updatePackages: function (doc) {
    const data = doc.modifier.$set;
    const { _id } = doc;
    PackagesSchema.validate(data);
    Packages.update({ _id: _id }, {
      $set: data
    });
  },
  deletePackage: function (id) {
    if (!SoldPackage.find({ idPackage: id })) {
      Packages.remove({ _id: id });
    } else {
      throw new Meteor.Error('No se puede eliminar este paquete');
    }
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
  },
  reportPackages: function (year) {
    if (Roles.userIsInRole(Meteor.userId(), operator) ||
      Roles.userIsInRole(Meteor.userId(), consultant) ||
      Roles.userIsInRole(Meteor.userId(), admin)
    ) {
      const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      Packages.find().fetch().forEach(item => {
        const date = new Date(item.createAt);
        if (date.getFullYear() === year.year) {
          monthsCount[date.getMonth()] += 1;
        }
      });
      return monthsCount;
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  filterPackages: function (doc) {
    if (Meteor.userId()) {
      const { queryE, queryP } = doc;
      const filterHotel = Hotels.find(queryE).map(element => element);
      const filterRenters = Renters.find(queryE).map(element => element);
      const fitlerRestaurant = Restaurants.find(queryE).map(element => element);
      const fitlerTransportation = TransportationEstablishments.find(queryE).map(element => (
        element
      ));
      const or = [];
      if (filterHotel) {
        const idHotel = {
          $in: filterHotel.map(element => element._id)
        };
        or.push({ idHotel });
      }
      if (filterRenters) {
        const idRenter = {
          $in: filterRenters.map(element => element._id)
        };
        or.push({ idRenter });
      }
      if (fitlerRestaurant) {
        const idRestaurant = {
          $in: fitlerRestaurant.map(element => element._id)
        };
        or.push({ idRestaurant });
      }
      if (fitlerTransportation) {
        const idTransport = {
          $in: fitlerTransportation.map(element => element._id)
        };
        or.push({ idTransport });
      }
      if (or.length > 0) {
        queryP.$or = or;
      }
      return Packages.find(queryP).fetch().map(element => ({
        _id: element._id,
        name: element.name,
        price: element.price,
        hotel: Hotels.findOne({ _id: element.idHotel }),
        roomHotel: RoomHotel.findOne({ _id: element.idRoom }),
        renter: Renters.findOne({ _id: element.idRenter }),
        fleetRenter: FleetRenter.findOne({ _id: element.idFleetRenter }),
        transport: TransportationEstablishments.findOne({ _id: element.idTransport }),
        route: RouteTransportationEstablishment.findOne({ _id: element.idTransportRoute }),
        restaurant: Restaurants.findOne({ _id: element.idRestaurant }),
        observation: element.observation
      }));
    } else {
      return [];
    }
  },
  addSoldPackage: function (doc) {
    SoldPackageSchema.validate(doc);
    SoldPackage.insert(doc);
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
