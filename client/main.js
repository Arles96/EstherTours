// Client entry point, imports all client code

import 'toastr/build/toastr.css';
import '../imports/startup/both';
import '../imports/startup/client';
import toastr from 'toastr';
import { Template } from 'meteor/templating';
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
