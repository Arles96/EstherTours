import './editHotel.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { HotelSchema } from '../../../api/hotels/hotels';
import municipalities from '../../../api/municipalities/municipality';
import HotelImage from '../../../api/hotels/hotelImage';

window.HotelImage = HotelImage;

Template.editHotel.helpers({
  HotelSchema: () => HotelSchema,
  categorization: () => Session.get('editHotelCategorization'),
  labelCategortization: function (categorization) {
    Session.set('editHotelCategorization', categorization);
    return 'Categorización';
  },
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityEditHotel', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityEditHotel', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityEditHotel')
});

AutoForm.addHooks('editHotelForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado el registro del hotel exitosamente.');
    Router.go('/list-hotels');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});

Template.updateStarHotel.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('editHotelCategorization'), 10)) {
        list.push({
          class: 'fas fa-star colorOrange',
          id: `start${index}`
        });
      } else {
        list.push({
          class: 'fas fa-star',
          id: `start${index}`
        });
      }
    }
    return list;
  }
});

Template.updateStarHotel.events({
  'click #start1': function () {
    Session.set('editHotelCategorization', '1');
  },
  'click #start2': function () {
    Session.set('editHotelCategorization', '2');
  },
  'click #start3': function () {
    Session.set('editHotelCategorization', '3');
  },
  'click #start4': function () {
    Session.set('editHotelCategorization', '4');
  },
  'click #start5': function () {
    Session.set('editHotelCategorization', '5');
  }
});
