import './addFleetRenter.html';
import { Session } from 'meteor/session';
import toastr from 'toastr';
import { FleetRenterSchema } from '../../../api/renters/fleetRenter';
import vehicleTypes from '../../../api/vehicleTypes/vehicleTypes';
import brands from '../../../api/brands/brands';
import compact from '../../../api/brands/compact';
import economics from '../../../api/brands/economics';
import intermediates from '../../../api/brands/intermediates';
import suv from '../../../api/brands/suv';
import pickups from '../../../api/brands/pickups';
import deluxe from '../../../api/brands/deluxe';
import coasters from '../../../api/brands/coasters';
import pullmans from '../../../api/brands/pullmans';
import airplanes from '../../../api/brands/airplanes';
import helicopters from '../../../api/brands/helicopters';
import sailplanes from '../../../api/brands/sailplanes';
import boats from '../../../api/brands/boats';
import sailboats from '../../../api/brands/sailboats';
import ferrys from '../../../api/brands/ferrys';
import canoes from '../../../api/brands/canoes';
import FleetRenterImage from '../../../api/renters/fleetRenterImage';

window.FleetRenterImage = FleetRenterImage;

Template.addFleetRenter.onCreated(() => {
  Session.set('firstOptionVehicleTypesRenter', '(Seleccione uno)');
  Session.set('firstOptionBrandsRenter', '(Seleccione uno)');
  Session.set('firstOptionModelsRenter', '(Seleccione uno)');
});

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
  brands: vehicleType => {
    if (vehicleType) {
      Session.set('firstOptionBrandsRenter', '(Seleccione uno)');
      return brands[vehicleType];
    } else {
      Session.set('firstOptionBrandsRenter', '(Seleccione Tipo de Vehículo)');
      return [];
    }
  },
  brandsfirstOption: () => Session.get('firstOptionBrandsRenter'),
  models: (brand, variable) => {
    if (!brand) {
      Session.set('firstOptionModelsRenter', '(Seleccione Marca)');
      return [];
    } else if (variable === 'Económico') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return economics[brand];
    } else if (variable === 'Compacto') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return compact[brand];
    } else if (variable === 'Intermedio') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return intermediates[brand];
    } else if (variable === 'SUV') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return suv[brand];
    } else if (variable === 'Pick-Up') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return pickups[brand];
    } else if (variable === 'De Lujo') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return deluxe[brand];
    } else if (variable === 'Coaster') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return coasters[brand];
    } else if (variable === 'Pullman') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return pullmans[brand];
    } else if (variable === 'Avión') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return airplanes[brand];
    } else if (variable === 'Helicóptero') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return helicopters[brand];
    } else if (variable === 'Planeador') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return sailplanes[brand];
    } else if (variable === 'Lancha') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return boats[brand];
    } else if (variable === 'Velero') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return sailboats[brand];
    } else if (variable === 'Ferry') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return ferrys[brand];
    } else if (variable === 'Canoa') {
      Session.set('firstOptionModelsRenter', '(Seleccione uno)');
      return canoes[brand];
    } else {
      Session.set('firstOptionModelsRenter', '(Seleccione Modelo)');
      return [];
    }
  },
  modelsfirstOption: () => Session.get('firstOptionModelsRenter')
});

AutoForm.addHooks('addFleetForm', {
  onSuccess: function (formtype, result) {
    toastr.success('Se ha agregado la flota exitosamente.');
  },
  onError: function (formtype, error) {
    toastr.error(error);
  }
});
