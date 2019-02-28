import './filterRoomHotel.html';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { RoomHotel } from '../../../api/hotels/roomhotel';
import { Hotels } from '../../../api/hotels/hotels';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';
import HotelImages from '../../../api/hotels/hotelImage';

Template.filterRoomHotel.onCreated(function createVars () {
  this.precioMax = new ReactiveVar(2500);
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('filterRoomHotelStars', '');
});

Template.filterRoomHotel.helpers({
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
    const queryH = {};
    if (name) {
      queryH.name = new RegExp(`.*${name}.*`, 'i');
    }
    if (Session.get('filterRoomHotelStars')) {
      queryH.categorization = Session.get('filterRoomHotelStars');
    }
    if (street) {
      queryH.street = new RegExp(`.*${street}.*`, 'i');
    }
    if (city) {
      queryH.city = new RegExp(`.*${city}.*`, 'i');
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
      price: {
        $lte: parseInt(precioMax, 10)
      }
    };
    if (filteredHotels) {
      query.idHotel = {
        $in: filteredHotels.map(doc => doc._id)
      };
    }
    // unir documentos del documento con los cuartos encontrados
    const filteredRooms = RoomHotel
      .find(query, { sort: { price: 1 } })
      .map(doc => ({ ...filteredHotels.find(({ _id }) => doc.idHotel === _id), ...doc }));

    return filteredRooms;
  }
});

Template.filterRoomHotel.events({
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

Template.filterResultRoomHotel.helpers({
  findImg (_id) {
    return HotelImages.findOne({ _id });
  },
  first (index) {
    return index === 0;
  }
});

Template.filterStarRoomHotel.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('filterRoomHotelStars'), 10)) {
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

Template.filterStarRoomHotel.events({
  'click #star1': function () {
    Session.set('filterRoomHotelStars', '1');
  },
  'click #star2': function () {
    Session.set('filterRoomHotelStars', '2');
  },
  'click #star3': function () {
    Session.set('filterRoomHotelStars', '3');
  },
  'click #star4': function () {
    Session.set('filterRoomHotelStars', '4');
  },
  'click #star5': function () {
    Session.set('filterRoomHotelStars', '5');
  }
});
