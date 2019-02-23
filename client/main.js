// Client entry point, imports all client code

import 'toastr/build/toastr.css';
import '../imports/startup/both';
import '../imports/startup/client';
import toastr from 'toastr';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { admin, consultant, operator } from '../imports/api/roles/roles';

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: 500,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
};

/**
 * Validación para saber si el usuario es administrador.
 * Esta función se usa en blaze
 */
Template.registerHelper('isAdmin', () => Roles.userIsInRole(Meteor.userId(), admin));

/**
 * Validación para saber si el usuario es un operador.
 * Esta función se usa en Blaze
 */
Template.registerHelper('isOperator', () => Roles.userIsInRole(Meteor.userId(), operator));

/**
 * Validación para saber si el usuario es un consultor.
 * Esta función se usa en Blaze
 */
Template.registerHelper('isConsultant', () => Roles.userIsInRole(Meteor.userId(), consultant));

/**
 * Validación para saber si el usuario inicio sesión
 * Esta función se usa en Blaze
 */
Template.registerHelper('isLoggedIn', () => Meteor.user());

/**
 * Helper para saber si se esta creando un empaquetado
 */
Template.registerHelper('isCreatePackage', () => Session.get('isCreatePackage'));

/**
 * Helper para empaquetado de atracciones
 */
Template.registerHelper('packageAttraction', () => Session.get('packageAttraction'));

/**
 * Helper para empaquetado de Habitaciones
 */
Template.registerHelper('packageRoomHotel', () => Session.get('packageRoomHotel'));

/**
 * Helper para empaquetado de Flota de arrendadoras
 */
Template.registerHelper('packageFleetRenter', () => Session.get('packageFleetRenter'));

/**
 * Helper para empaquetado de Restaurante
 */
Template.registerHelper('packageRestaurant', () => Session.get('packageRestaurant'));

/**
 * Helper para empaquetado de Rutas de Transporte
 */
Template.registerHelper('packageRouteTransport', () => Session.get('packageRouteTransport'));

/**
 * Comparar dos cadenas
 */
Template.registerHelper('isEqual', (text1, text2) => text1 === text2);

/**
 * Obtener el id de la arrendara
 */
Template.registerHelper('packageRenter', () => Session.get('packageRenter'));

/**
 * Obtener el id del hotel
 */
Template.registerHelper('packageHotel', () => Session.get('packageHotel'));

/**
 * Obtener el id del establecimiento de transporte
 */
Template.registerHelper('packageTransport', () => Session.get('packageTransport'));

/**
 * Obtener el nombre del paquete
 */
Template.registerHelper('namePackage', () => Session.get('namePackage'));
