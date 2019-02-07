import './editFleetRenter.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { FleetRenterSchema } from '../../../api/renters/fleetRenter';
import vehicleTypes from '../../../api/vehicleTypes/vehicleTypes';

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
  firstOption: () => Session.get('firstOptionVehicleTypesRenter')
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
