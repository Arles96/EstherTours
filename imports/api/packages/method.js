import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
import { Packages, PackagesSchema } from './packages';
import { operator, consultant, admin } from '../roles/roles';
import PackagesSchemaConsult from './packageConsult';
import { Hotels } from '../hotels/hotels';
import { RoomHotel } from '../hotels/roomhotel';
import { Renters } from '../renters/renters';
import { FleetRenter } from '../renters/fleetRenter';
import { Restaurants } from '../restaurants/restaurants';
import { TransportationEstablishments } from '../TransportationEstablishment/TransportationEstablishment';
import { RouteTransportationEstablishment } from '../TransportationEstablishment/RouteTransportationEstablishment';

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
      const renter = Renters.findOne({ _id: doc.idRenter });
      const fleet = FleetRenter.findOne({ _id: doc.idFleetRenter });
      const hotel = Hotels.findOne({ _id: doc.idHotel });
      const room = RoomHotel.findOne({ _id: doc.idRoom });
      const transport = TransportationEstablishments.findOne({ _id: doc.idTransport });
      const route = RouteTransportationEstablishment.findOne({ _id: doc.idTransportRoute });
      const restaurant = Restaurants.findOne({ _id: doc.idRestaurant });

      data.push(['Nombre del paquete', 'Precio', 'Observaciones']);
      data.push([
        doc.name,
        doc.price,
        doc.observation
      ]);
      data.push([]);
      if (renter) {
        data.push([`Arrendadora ${renter.name}`]);
        data.push(['Departamento', 'Municipio', 'Ciudad', 'Calle']);
        data.push([
          renter.department,
          renter.municipality,
          renter.city,
          renter.street
        ]);
        data.push([]);
      }

      if (fleet) {
        data.push(['Flota de Arrendadora']);
        data.push(['Tipo', 'Total', 'Tipo de Vehículo', 'Marca', 'Modelo', 'Tarifa']);
        data.push([
          fleet.type,
          fleet.total,
          fleet.vehicleTypes,
          fleet.brands,
          fleet.models,
          fleet.rate
        ]);
        data.push([]);
      }

      if (hotel) {
        data.push([`Hotel ${hotel.name}`]);
        data.push(['Estrellas', 'Departamento', 'Municipio', 'Ciudad', 'Calle']);
        data.push([
          hotel.categorization,
          hotel.departament,
          hotel.municipality,
          hotel.city,
          hotel.street
        ]);
        data.push([]);
      }

      if (room) {
        data.push(['Cuarto de Hotel']);
        data.push(['Tipo', 'Tamaño', 'Precio', 'Camas extra']);
        data.push([
          room.type,
          room.roomSize,
          room.price,
          room.extraBed
        ]);
        data.push([]);
      }

      if (transport) {
        data.push([`Transporte ${transport.name}`]);
        data.push(['Departamento', 'Municipio', 'Ciudad', 'Calle']);
        data.push([
          transport.department,
          transport.town,
          transport.city,
          transport.street
        ]);
        data.push([]);
      }

      if (route) {
        data.push(['Ruta']);
        data.push(['Tipo', 'Departamento', 'Municipio', 'Ciudad', 'Calle']);
        data.push([
          route.type,
          route.department,
          route.town,
          route.city,
          route.street
        ]);
        data.push(['Indicaciones adicionales:', route.description]);
        data.push([]);
      }

      if (restaurant) {
        data.push([`Restaurante ${restaurant.name}`]);
        data.push([
          'Departamento',
          'Municipio',
          'Ciudad',
          'Calle',
          'Estrellas',
          'Mesas',
          'Sillas',
          'Sillas para bebes',
          'Capacidad',
          'Facilidades para discapacitados',
          'Barra',
          'Sala de espera'
        ]);
        data.push([
          restaurant.department,
          restaurant.municipality,
          restaurant.city,
          restaurant.street,
          restaurant.rating,
          restaurant.numbersTables,
          restaurant.numbersChairs,
          restaurant.numbersChairsBabies,
          restaurant.maxPersonCapacity,
          restaurant.facilityPeople ? 'Si' : 'No',
          restaurant.bar ? 'Si' : 'No',
          restaurant.waitingRoom ? 'Si' : 'No'
        ]);
      }

      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, `Paquete ${doc.name}`);
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
