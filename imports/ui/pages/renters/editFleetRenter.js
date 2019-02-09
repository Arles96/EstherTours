import './editFleetRenter.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { FleetRenterSchema } from '../../../api/renters/fleetRenter';
import vehicleTypes from '../../../api/vehicleTypes/vehicleTypes';
import brands from '../../../api/brands/brands';

Template.editFleetRenter.helpers({
  FleetRenterSchema: () => FleetRenterSchema,
  fleetRenter: () => Session.get('fleetRenter'),
  vehicleTypes: type => {
    if (type) {
      Session.set('firstOptionVehicleTypesRenter', '(Seleccione uno)');
      return vehicleTypes[type];
    } else {
      Session.set('firstOptionVehicleTypesRenter', '(Seleccione Tipo de Flota)');
      return [];
    }
  },
  firstOption: () => Session.get('firstOptionVehicleTypesRenter'),
  brands: vehicleTypes => {
    if (vehicleTypes) {
      Session.set('firstOptionBrandsRenter', '(Seleccione uno)');
      return brands[vehicleTypes];
    } else {
      Session.set('firstOptionBrandsRenter', '(Seleccione Tipo de Flota)');
      return [];
    }
  },
});

AutoForm.addHooks('editFleetForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha actualizado los datos de la flota exitosamente.');
    $('#editFleetRenter').modal('hide');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
