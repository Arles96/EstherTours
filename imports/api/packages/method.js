import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
import { Packages, PackagesSchema } from './packages';
import { operator, consultant, admin } from '../roles/roles';
import PackagesSchemaConsult from './packageConsult';
import { hotelsToExcel } from '../hotels/hotels';
import { roomToExcel } from '../hotels/roomhotel';
import { renterToExcel } from '../renters/renters';
import { fleetRenterToExcel } from '../renters/fleetRenter';
import { restaurantToExcel } from '../restaurants/restaurants';
import { transportToExcel } from '../TransportationEstablishment/TransportationEstablishment';
import { routeTransportToExcel } from '../TransportationEstablishment/RouteTransportationEstablishment';

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
    Packages.remove({ _id: id });
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
  exportToExcel: function () {
    // workbook
    const wb = XLSX.utils.book_new();

    // por cada paquete existente creamos un worksheet
    Packages.find({}).forEach(doc => {
      const data = [];

      const renterRes = renterToExcel(doc.idRenter);
      const fleetRenterRes = fleetRenterToExcel(doc.idFleetRenter);
      const hotelRes = hotelsToExcel(doc.idHotel);
      const roomRes = roomToExcel(doc.idRoom);
      const transportRes = transportToExcel(doc.idTransport);
      const routeRes = routeTransportToExcel(doc.idTransportRoute);
      const restaurantRes = restaurantToExcel(doc.idRestaurant);

      data.push(['Nombre del paquete', 'Precio', 'Observaciones']);
      data.push([
        doc.name,
        doc.price,
        doc.observation
      ]);
      data.push([]);

      for (let i = 0; i < renterRes.length; i += 1) {
        data.push(renterRes[i]);
      }

      for (let i = 0; i < fleetRenterRes.length; i += 1) {
        data.push(fleetRenterRes[i]);
      }

      for (let i = 0; i < hotelRes.length; i += 1) {
        data.push(hotelRes[i]);
      }

      for (let i = 0; i < roomRes.length; i += 1) {
        data.push(roomRes[i]);
      }

      for (let i = 0; i < transportRes.length; i += 1) {
        data.push(transportRes[i]);
      }

      for (let i = 0; i < routeRes.length; i += 1) {
        data.push(routeRes[i]);
      }

      for (let i = 0; i < restaurantRes.length; i += 1) {
        data.push(restaurantRes[i]);
      }

      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, doc.name);
    });

    return wb;
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
  }
});
