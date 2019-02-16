import './packageRoomHotel.html';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import toastr from 'toastr';
import { RoomHotel } from '../../../api/hotels/roomhotel';
import { Hotels } from '../../../api/hotels/hotels';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';
import HotelImages from '../../../api/hotels/hotelImage';

Template.packageRoomHotel.onCreated(function createVars () {
  this.precioMax = new ReactiveVar(10000);
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('packageRoomHotelStars', undefined);
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
      street: new RegExp(`.*${street}.*`, 'i'),
      city: new RegExp(`.*${city}.*`, 'i')
    };

    if (Session.get('packageRoomHotelStars')) {
      queryH.categorization = Session.get('packageRoomHotelStars');
    }

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
  selected (id) {
    return id === Session.get('packageRoomId');
  },
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
