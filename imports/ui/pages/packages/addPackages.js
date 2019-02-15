import './addPackages.html';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import toastr from 'toastr';
import { RoomHotel } from '../../../api/hotels/roomhotel';
import { Hotels } from '../../../api/hotels/hotels';
import { RouteTransportationEstablishment } from '../../../api/TransportationEstablishment/RouteTransportationEstablishment';
import { TransportationEstablishments } from '../../../api/TransportationEstablishment/TransportationEstablishment';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';
import HotelImages from '../../../api/hotels/hotelImage';
import { PackagesSchema } from '../../../api/packages/packages';

Template.addPackages.onCreated(() => {
  Session.set('packageHotelId', undefined);
  Session.set('packageRoomId', undefined);
  Session.set('packageTEId', undefined);
  Session.set('packageRouteId', undefined);
});

Template.addPackages.helpers({
  PackagesSchema: () => PackagesSchema,
  hotel: () => Session.get('packageHotelId'),
  room: () => Session.get('packageRoomId'),
  roomSelected: () => Session.get('packageHotelId') && Session.get('packageRoomId'),
  TE: () => Session.get('packageTEId'),
  route: () => Session.get('packageRouteId'),
  routeSelected: () => Session.get('packageTEId') && Session.get('packageRouteId')
});

AutoForm.addHooks('addPackagesForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha creado el paquete exitosamente.');
    Session.set('packageHotelId', undefined);
    Session.set('packageRoomId', undefined);
    Session.set('packageTEId', undefined);
    Session.set('packageRouteId', undefined);
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});

// Inicio busqueda de cuartos de hotel

Template.packageRoomHotel.onCreated(function createVars () {
  this.precioMax = new ReactiveVar(2500);
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('packageRoomHotelStars', '0');
});

Template.packageRoomHotel.helpers({
  precioMax () {
    return Template.instance().precioMax.get();
  },
  name () {
    return Template.instance().name.get();
  },
  street () {
    return Template.instance().street.get();
  },
  city () {
    return Template.instance().city.get();
  },
  department () {
    return Template.instance().department.get();
  },
  municipality () {
    return Template.instance().municipality.get();
  },
  listDepartment () {
    return departments;
  },
  listMunicipality () {
    const department = Template.instance().department.get();
    return municipalities[department];
  },
  deptSelected () {
    const department = Template.instance().department.get();
    return department !== '';
  },
  buscar () {
    // filtrar por hotel primero
    const precioMax = Template.instance().precioMax.get();
    const name = Template.instance().name.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();

    const queryH = {
      name: new RegExp(`.*${name}.*`, 'i'),
      categorization: {
        $lte: Session.get('packageRoomHotelStars')
      },
      street: new RegExp(`.*${street}.*`, 'i'),
      city: new RegExp(`.*${city}.*`, 'i')
    };

    if (department) {
      queryH.departament = department;
    }

    if (municipality) {
      queryH.municipality = municipality;
    }

    const filteredHotels = Hotels
      .find(queryH)
      .map(doc => doc);

    // con los hoteles obtenidos, filtrar por habitacion
    const query = {
      idHotel: {
        $in: filteredHotels.map(doc => doc._id)
      },
      price: {
        $lte: parseInt(precioMax, 10)
      }
    };

    // unir documentos del documento con los cuartos encontrados
    const filteredRooms = RoomHotel
      .find(query, { sort: { price: 1 } })
      .map(doc => ({ ...filteredHotels.find(({ _id }) => doc.idHotel === _id), ...doc }));

    return filteredRooms;
  }
});

Template.packageRoomHotel.events({
  'input #sliderMax' (event, templateInstance) {
    templateInstance.precioMax.set(event.currentTarget.value);
  },
  'input #name' (event, templateInstance) {
    templateInstance.name.set(event.currentTarget.value);
  },
  'input #street' (event, templateInstance) {
    templateInstance.street.set(event.currentTarget.value);
  },
  'input #city' (event, templateInstance) {
    templateInstance.city.set(event.currentTarget.value);
  },
  'change #department' (event, templateInstance) {
    templateInstance.department.set(event.currentTarget.value);
    templateInstance.municipality.set('');
  },
  'change #municipality' (event, templateInstance) {
    templateInstance.municipality.set(event.currentTarget.value);
  }
});

Template.packageResultRoomHotel.helpers({
  findImg (_id) {
    return HotelImages.findOne({ _id });
  },
  first (index) {
    return index === 0;
  }
});

Template.packageResultRoomHotel.events({
  'click #packageAddRoom' (event, templateInstance) {
    Session.set('packageHotelId', this.idHotel);
    Session.set('packageRoomId', this._id);
    toastr.info('Se guardo la habitacion al paquete!');
  }
});

Template.packageStarRoomHotel.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('packageRoomHotelStars'), 10)) {
        list.push({
          class: 'fas fa-star colorOrange',
          id: `star${index}`
        });
      } else {
        list.push({
          class: 'fas fa-star',
          id: `star${index}`
        });
      }
    }
    return list;
  }
});

Template.packageStarRoomHotel.events({
  'click #star1': function () {
    Session.set('packageRoomHotelStars', '1');
  },
  'click #star2': function () {
    Session.set('packageRoomHotelStars', '2');
  },
  'click #star3': function () {
    Session.set('packageRoomHotelStars', '3');
  },
  'click #star4': function () {
    Session.set('packageRoomHotelStars', '4');
  },
  'click #star5': function () {
    Session.set('packageRoomHotelStars', '5');
  }
});

// Fin busqueda de cuartos de hotel

// Inicio busqueda de rutas de transporte

Template.packageRouteTE.onCreated(function createVars () {
  this.type = new ReactiveVar('');
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('packageRouteTEStars', '0');
});

Template.packageRouteTE.helpers({
  type () {
    return Template.instance().type.get();
  },
  name () {
    return Template.instance().name.get();
  },
  street () {
    return Template.instance().street.get();
  },
  city () {
    return Template.instance().city.get();
  },
  department () {
    return Template.instance().department.get();
  },
  municipality () {
    return Template.instance().municipality.get();
  },
  listDepartment () {
    return departments;
  },
  listMunicipality () {
    const department = Template.instance().department.get();
    return municipalities[department];
  },
  deptSelected () {
    const department = Template.instance().department.get();
    return department !== '';
  },
  buscar () {
    // filtrar por establecimiento de transporte primero
    const type = Template.instance().type.get();
    const name = Template.instance().name.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();

    const queryR = {
      name: new RegExp(`.*${name}.*`, 'i'),
      categorization: {
        $lte: Session.get('packageRouteTEStars')
      }
    };

    const filteredTE = TransportationEstablishments
      .find(queryR)
      .map(doc => doc);

    // con los establecimientos obtenidos, filtrar por ruta
    const query = {
      idTransportationEstablishment: {
        $in: filteredTE.map(doc => doc._id)
      },
      street: new RegExp(`.*${street}.*`, 'i'),
      city: new RegExp(`.*${city}.*`, 'i'),
      type: new RegExp(`.*${type}.*`, 'i')
    };

    if (department) {
      query.department = department;
    }

    if (municipality) {
      query.town = municipality;
    }

    // unir documentos del documento con las rutas encontradas
    const filteredRoutes = RouteTransportationEstablishment
      .find(query)
      .map(doc => ({
        ...filteredTE.find(({ _id }) => doc.idTransportationEstablishment === _id),
        ...doc
      }));

    return filteredRoutes;
  }
});

Template.packageRouteTE.events({
  'input #sliderMaxRate' (event, templateInstance) {
    templateInstance.tarifaMax.set(event.currentTarget.value);
  },
  'input #sliderMaxTotal' (event, templateInstance) {
    templateInstance.total.set(event.currentTarget.value);
  },
  'input #name' (event, templateInstance) {
    templateInstance.name.set(event.currentTarget.value);
  },
  'input #street' (event, templateInstance) {
    templateInstance.street.set(event.currentTarget.value);
  },
  'input #city' (event, templateInstance) {
    templateInstance.city.set(event.currentTarget.value);
  },
  'change #type' (event, templateInstance) {
    templateInstance.type.set(event.currentTarget.value);
  },
  'change #department' (event, templateInstance) {
    templateInstance.department.set(event.currentTarget.value);
    templateInstance.municipality.set('');
  },
  'change #municipality' (event, templateInstance) {
    templateInstance.municipality.set(event.currentTarget.value);
  }
});

Template.packageResultRouteTE.helpers({
  first (index) {
    return index === 0;
  }
});

Template.packageResultRouteTE.events({
  'click #packageAddRoute' (event, templateInstance) {
    Session.set('packageTEId', this.idTransportationEstablishment);
    Session.set('packageRouteId', this._id);
    toastr.info('Se guardo la ruta al paquete!');
  }
});

Template.packageStarRouteTE.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('packageRouteTEStars'), 10)) {
        list.push({
          class: 'fas fa-star colorOrange',
          id: `star${index}`
        });
      } else {
        list.push({
          class: 'fas fa-star',
          id: `star${index}`
        });
      }
    }
    return list;
  }
});

Template.packageStarRouteTE.events({
  'click #star1': function () {
    Session.set('packageRouteTEStars', '1');
  },
  'click #star2': function () {
    Session.set('packageRouteTEStars', '2');
  },
  'click #star3': function () {
    Session.set('packageRouteTEStars', '3');
  },
  'click #star4': function () {
    Session.set('packageRouteTEStars', '4');
  },
  'click #star5': function () {
    Session.set('packageRouteTEStars', '5');
  }
});

// Fin busqueda de rutas de transporte
