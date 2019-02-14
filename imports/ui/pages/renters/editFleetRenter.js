import './editFleetRenter.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { FleetRenterSchema } from '../../../api/renters/fleetRenter';
import vehicleTypes from '../../../api/vehicleTypes/vehicleTypes';
import brands from '../../../api/brands/brands';
import models from '../../../api/models/models';
import FleetRenterImage from '../../../api/renters/fleetRenterImage';

window.FleetRenterImage = FleetRenterImage;

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
  vehicleTypeFirstOption: () => Session.get('firstOptionVehicleTypesRenter'),
  brands: vehicleType => {
    if (vehicleType) {
      Session.set('firstOptionBrandsRenter', '(Seleccione uno)');
      return brands[vehicleType];
    } else {
      Session.set('firstOptionBrandsRenter', '(Seleccione Tipo de Flota)');
      return [];
    }
  },
  brandsfirstOption: () => Session.get('firstOptionBrandsRenter'),
  models: brand => {
    if (brand) {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return models[brand];
    } else {
      Session.set('firstOptionModelsRenter', '(Seleccione Modelo)');
      return [];
    }
  },
  modelssfirstOption: () => Session.get('firstOptionModelsRenter')
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
