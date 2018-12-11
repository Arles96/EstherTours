import './editRestaurantOffer.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { restaurantOffersSchema } from '../../../api/restaurants/restaurantOffers';
import municipalities from '../../../api/municipalities/municipality';

Template.editRestaurantOffer.helpers({
  restaurantOffersSchema: () => restaurantOffersSchema,
  restaurantOffers: () => Session.get('restaurantOffers'),
  municipalities: department => {
    if (department) {
      Session.set('firstOptionMunicipalityEditRestaurant', '(Seleccione uno)');
      return municipalities[department];
    } else {
      Session.set('firstOptionMunicipalityEditRestaurant', '(Seleccione Departamento)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionMunicipalityEditRestaurant')
});

AutoForm.addHooks('editOffersForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la oferta exitosamente.');
    $('#editRestaurantOffer').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
