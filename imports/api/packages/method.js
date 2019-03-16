import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';
import XLSX from 'xlsx';
import { Packages, PackagesSchema } from './packages';
import { consultant } from '../roles/roles';
import PackagesSchemaConsult from './packageConsult';
import { Hotels, hotelsToExcel } from '../hotels/hotels';
import { RoomHotel, roomToExcel } from '../hotels/roomhotel';
import { Renters, renterToExcel } from '../renters/renters';
import { FleetRenter, fleetRenterToExcel } from '../renters/fleetRenter';
import { Restaurants, restaurantToExcel } from '../restaurants/restaurants';
import { TransportationEstablishments, transportToExcel } from '../TransportationEstablishment/TransportationEstablishment';
import { RouteTransportationEstablishment, routeTransportToExcel } from '../TransportationEstablishment/RouteTransportationEstablishment';
import { SoldPackage, SoldPackageSchema } from './soldPackage';
import { userActivities } from '../userActivities/userActivities';
import { attractionToExcel } from '../attractions/attractions';
import { toursToExcel } from '../tours/tours';

Meteor.methods({
  insertPackages: function (doc) {
    if (doc.idRenter || doc.idGuide || doc.idTransport ||
      doc.idRestaurant || doc.idHotel) {
      PackagesSchema.validate(doc);
      Packages.insert(doc);
      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        role: Meteor.user().roles[0],
        activity: 'agregó',
        collection: 'paquetes',
        registerId: 'N/D',
        register: doc.name,
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Debe contener al menos un registro de las entidades');
    }
  },
  updatePackages: function (doc) {
    const data = { ...doc.modifier.$set, ...doc.modifier.$unset };
    const { _id } = doc;
    if (data.idRenter || data.idGuide || data.idTransport || data.idRestaurant || data.idHotel) {
      PackagesSchema.validate(data);
      Packages.update({ _id }, {
        $set: data
      });
      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        role: Meteor.user().roles[0],
        activity: 'editó',
        collection: 'paquetes',
        registerId: _id,
        register: doc.name,
        date: new Date()
      });
    } else {
      throw new Meteor.Error('Debe contener al menos un registro de las entidades');
    }
  },
  deletePackage: function (id) {
    if (!SoldPackage.findOne({ idPackage: id })) {
      Packages.remove({ _id: id });
      userActivities.insert({
        userId: Meteor.userId(),
        user: `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`,
        role: Meteor.user().roles[0],
        activity: 'eliminó',
        collection: 'paquetes',
        registerId: 'N/D',
        register: 'N/D',
        date: new Date()
      });
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
  exportToExcel: function (query = {}) {
    // workbook
    const wb = XLSX.utils.book_new();

    // por cada paquete existente creamos un worksheet
    Packages.find(query).forEach(doc => {
      const data = [];

      const renterRes = renterToExcel(doc.idRenter);
      const fleetRenterRes = fleetRenterToExcel(doc.idFleetRenter);
      const hotelRes = hotelsToExcel(doc.idHotel);
      const roomRes = roomToExcel(doc.idRoom);
      const transportRes = transportToExcel(doc.idTransport);
      const routeRes = routeTransportToExcel(doc.idTransportRoute);
      const restaurantRes = restaurantToExcel(doc.idRestaurant);
      const attractionRes = attractionToExcel(doc.idAttraction);
      const tourRes = toursToExcel(doc.idTour);

      data.push(['Nombre del paquete', 'Precio', 'Observaciones']);
      data.push([
        doc.name,
        doc.price,
        doc.observation
      ]);
      data.push([]);

      data.push(
        ...renterRes,
        ...fleetRenterRes,
        ...hotelRes,
        ...roomRes,
        ...transportRes,
        ...routeRes,
        ...restaurantRes,
        ...attractionRes,
        ...tourRes
      );

      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, doc.name);
    });

    return wb;
  },
  exportFilteredToExcel: function (queries) {
    const { queryE, queryP } = queries;
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

    // workbook
    const wb = XLSX.utils.book_new();

    // por cada paquete existente creamos un worksheet
    let empty = true;
    Packages.find(queryP).forEach(doc => {
      const data = [];

      const renterRes = renterToExcel(doc.idRenter);
      const fleetRenterRes = fleetRenterToExcel(doc.idFleetRenter);
      const hotelRes = hotelsToExcel(doc.idHotel);
      const roomRes = roomToExcel(doc.idRoom);
      const transportRes = transportToExcel(doc.idTransport);
      const routeRes = routeTransportToExcel(doc.idTransportRoute);
      const restaurantRes = restaurantToExcel(doc.idRestaurant);
      const attractionRes = attractionToExcel(doc.idAttraction);
      const tourRes = toursToExcel(doc.idTour);

      data.push(['Nombre del paquete', 'Precio', 'Observaciones']);
      data.push([
        doc.name,
        doc.price,
        doc.observation
      ]);
      data.push([]);

      data.push(
        ...renterRes,
        ...fleetRenterRes,
        ...hotelRes,
        ...roomRes,
        ...transportRes,
        ...routeRes,
        ...restaurantRes,
        ...attractionRes,
        ...tourRes
      );

      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, doc.name);
      empty = false;
    });

    if (empty) {
      const ws = XLSX.utils.aoa_to_sheet([[]]);
      XLSX.utils.book_append_sheet(wb, ws, 'Vacio');
    }
    return wb;
  },
  reportPackages: function (year) {
    const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Packages.find().fetch().forEach(item => {
      const date = new Date(item.createAt);
      if (date.getFullYear() === year.year) {
        monthsCount[date.getMonth()] += 1;
      }
    });
    return monthsCount;
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
  sendEmailPackage: function (id, email) {
    if (Roles.userIsInRole(Meteor.userId(), consultant)) {
      const pkg = Packages.findOne({ _id: id });

      const hotel = Hotels.findOne({ _id: pkg.idHotel });
      const room = RoomHotel.findOne({ _id: pkg.idRoom });
      const renter = Renters.findOne({ _id: pkg.idRenter });
      const fleetRenter = FleetRenter.findOne({ _id: pkg.idFleetRenter });
      const transport = TransportationEstablishments.findOne({ _id: pkg.idTransport });
      const route = RouteTransportationEstablishment.findOne({ _id: pkg.idTransportRoute });
      const restaurant = Restaurants.findOne({ _id: pkg.idRestaurant });

      setTimeout(Meteor.bindEnvironment(() => {
        SSR.compileTemplate('emailPackage', Assets.getText('Paquete.html'));
        const html = SSR.render('emailPackage', {
          package: pkg,
          hotel: hotel,
          room: room,
          renter: renter,
          fleetRenter: fleetRenter,
          transport: transport,
          route: route,
          restaurant: restaurant,
          cantStars: num => '★'.repeat(parseInt(num, 10)),
          noZero: num => num > 0,
          getImage: url => Meteor.absoluteUrl(`img/${url}`)
        });
        Email.send({
          from: 'aulio.maldonado@gmail.com',
          to: email,
          subject: `Paquete: ${pkg.name}`,
          html: html
        });
      }), 0);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  addSoldPackage: function (doc) {
    SoldPackageSchema.validate(doc);
    SoldPackage.insert(doc);
  },
  reportSoldPackages: function (year) {
    const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    SoldPackage.find({ sold: true }).fetch().forEach(item => {
      const date = new Date(item.createAt);
      if (date.getFullYear() === year.year) {
        monthsCount[date.getMonth()] += 1;
      }
    });
    return monthsCount;
  },
  maxValuesPackages: function () {
    return Packages.findOne({}, { sort: { price: -1 } });
  }
});
