import './hotelQuery.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import HotelQuerySchema from '../../../api/hotels/hotelQuery';
import municipalities from '../../../api/municipalities/municipality';

Template.hotelQuery.helpers({
  HotelQuerySchema: () => HotelQuerySchema,
  categorization: () => Session.get('hotelQCategorization'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityHotelQ', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityHotelQ', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityHotelQ')
});

Template.hotelQuery.events({
  'change .categorization [type=radio]' (event) {
    Session.set('hotelQCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('hotelQueryForm', {
  onSuccess: function (formtype, result) {
    Session.set('hotelQCategorization', undefined);
    Session.set('hotelQueryDoc', result);
    Router.go('/show-query-hotel');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
