import './filterFleetRenters.html';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { RoomHotel } from '../../../api/hotels/roomhotel';
import { Hotels } from '../../../api/hotels/hotels';
import departments from '../../../api/departments/departments';
import municipalities from '../../../api/municipalities/municipality';
import HotelImages from '../../../api/hotels/hotelImage';

// TODO mostrar por paginas

Template.filterFleetRenters.onCreated(function createVars () {
  this.tarifaMax = new ReactiveVar(2500);
  this.name = new ReactiveVar('');
  this.street = new ReactiveVar('');
  this.city = new ReactiveVar('');
  this.department = new ReactiveVar('');
  this.municipality = new ReactiveVar('');
  Session.set('filterFleetRenterStars', '5');
});

Template.filterFleetRenters.helpers({
  tarifaMax () {
    return Template.instance().tarifaMax.get();
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
    const tarifaMax = Template.instance().tarifaMax.get();
    const name = Template.instance().name.get();
    const street = Template.instance().street.get();
    const city = Template.instance().city.get();
    const department = Template.instance().department.get();
    const municipality = Template.instance().municipality.get();

    const queryR = {
      name: new RegExp(`.*${name}.*`, 'i'),
      categorization: {
        $lte: Session.get('filterFleetRenterStars')
      },
      street: new RegExp(`.*${street}.*`, 'i'),
      city: new RegExp(`.*${city}.*`, 'i')
    };

    if (department) {
      queryR.departament = department;
    }

    if (municipality) {
      queryR.municipality = municipality;
    }

    const filteredHotels = Hotels
      .find(queryR)
      .map(doc => doc);

    // con las arrendadoras obtenidos, filtrar por habitacion
    const query = {
      idHotel: {
        $in: filteredHotels.map(doc => doc._id)
      },
      price: {
        $lte: parseInt(tarifaMax, 10)
      }
    };

    // unir documentos del documento con los cuartos encontrados
    const filteredRooms = RoomHotel
      .find(query, { sort: { price: 1 } })
      .map(doc => ({ ...filteredHotels.find(({ _id }) => doc.idHotel === _id), ...doc }));

    return filteredRooms;
  }
});

Template.filterFleetRenters.events({
  'input #sliderMax' (event, templateInstance) {
    templateInstance.tarifaMax.set(event.currentTarget.value);
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

Template.filterResultFleetRenter.helpers({
  findImg (_id) {
    return HotelImages.findOne({ _id });
  },
  first (index) {
    return index === 0;
  }
});

Template.filterStarFleetRenter.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('filterFleetRenterStars'), 10)) {
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

Template.filterStarFleetRenter.events({
  'click #star1': function () {
    Session.set('filterFleetRenterStars', '1');
  },
  'click #star2': function () {
    Session.set('filterFleetRenterStars', '2');
  },
  'click #star3': function () {
    Session.set('filterFleetRenterStars', '3');
  },
  'click #star4': function () {
    Session.set('filterFleetRenterStars', '4');
  },
  'click #star5': function () {
    Session.set('filterFleetRenterStars', '5');
  }
});
