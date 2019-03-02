import './branchHotel.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { HotelSchema } from '../../../api/hotels/hotels';
import municipalities from '../../../api/municipalities/municipality';

Template.branchHotel.helpers({
  HotelSchema: () => HotelSchema,
  categorization: () => Session.get('branchHotelRating'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityHotel', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityHotel', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityHotel'),
  textCategorization: function (text) {
    Session.set('branchHotelRating', text);
    return 'Categorización';
  }
});

Template.branchHotel.events({
  'change .categorization [type=radio]' (event) {
    Session.set('branchHotelRating', event.currentTarget.value);
  }
});

AutoForm.addHooks('branchHotelsForms', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la sucursal de la arrendadora exitosamente.');
    Router.go(`/show-hotel/${this.docId}`);
  },
  onError: function (formtype, error) {
    if (error.error === 'Repeated Branch') {
      toastr.error(new Error('Ya existe una sucursal con esas direcciones!'));
    } else {
      toastr.error(error);
    }
  }
});

Template.updateBranchStarHotel.helpers({
  list: () => {
    const list = [];
    for (let index = 1; index <= 5; index += 1) {
      if (index <= parseInt(Session.get('branchHotelRating'), 10)) {
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

Template.updateBranchStarHotel.events({
  'click #start1': function () {
    Session.set('branchHotelRating', '1');
  },
  'click #start2': function () {
    Session.set('branchHotelRating', '2');
  },
  'click #start3': function () {
    Session.set('branchHotelRating', '3');
  },
  'click #start4': function () {
    Session.set('branchHotelRating', '4');
  },
  'click #start5': function () {
    Session.set('branchHotelRating', '5');
  }
});
