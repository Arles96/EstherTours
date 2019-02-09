import './addFleetRenter.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { FleetRenterSchema } from '../../../api/renters/fleetRenter';
import vehicleTypes from '../../../api/vehicleTypes/vehicleTypes';
import brands from '../../../api/brands/brands';

Template.addFleetRenter.helpers({
  FleetRenterSchema: () => FleetRenterSchema,
  idRenter: () => Session.get('idRenter'),
  vehicleTypes: type => {
    if (type) {
      Session.set('firstOptionVehicleTypesRenter', '(Seleccione uno)');
      return vehicleTypes[type];
    } else {
      Session.set('firstOptionVehicleTypesRenter', '(Seleccione Tipo de Flota)');
      return [];
    }
  },
  vehicleTypeFirstOption: () => Session.get('firstOptionVehicleTypesRenter'),
  brands: vehicleTypes => {
    if (vehicleTypes) {
      Session.set('firstOptionBrandsRenter', '(Seleccione uno)');
      return brands[vehicleTypes];
    } else {
      Session.set('firstOptionBrandsRenter', '(Seleccione Tipo de Flota)');
      return [];
    }
  },
  brandsfirstOption: () => Session.get('firstOptionBrandsRenter')
});

AutoForm.addHooks('addFleetForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la flota exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
