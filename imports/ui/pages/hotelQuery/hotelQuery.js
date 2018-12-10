import './hotelQuery.html';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import HotelQuerySchema from '../../../api/hotels/hotelQuery';

Template.hotelQuery.helpers({
  HotelQuerySchema: () => HotelQuerySchema,
  categorization: () => Session.get('hotelQCategorization')
});

Template.hotelQuery.events({
  'change .categorization [type=radio]' (event) {
    Session.set('hotelQCategorization', event.currentTarget.value);
  }
});

AutoForm.addHooks('hotelQueryForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Buscando...');
    Session.set('hotelQueryDoc', result);
    Router.go('/show-query-hotel');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
