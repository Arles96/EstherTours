import { Meteor } from 'meteor/meteor';
import {
  admin,
  operator,
  consultant,
  supervisor
} from '../../api/roles/roles';

/**
 * Función para validar cuando el usuario no ha iniciado sesión
 * @param {function} self
 */
export const isNotLoggedIn = self => {
  if (!Meteor.user()) {
    self.next();
  } else {
    Router.go('/dashboard');
  }
};

/**
 * Función para validar si el usuario inicio sesión
 * @param {function} self
 */
export const isLoggedIn = self => {
  if (Meteor.user()) {
    self.next();
  } else {
    Router.go('/');
  }
};

/**
 * Función para validar si el usuario tiene el rol de administrador
 * @param {funtion} self
 */
export const isAdmin = self => {
  if (!Meteor.user()) {
    Router.go('/');
  } else if (Roles.userIsInRole(Meteor.userId(), admin)) {
    self.next();
  } else {
    self.layout('App_body');
    self.render('App_notFound');
  }
};

/**
 * Función para validar si el usuario tiene el rol de supervisor
 * @param {function} self
 */
export const isSupervisor = self => {
  if (!Meteor.user()) {
    Router.go('/');
  } else if (Roles.userIsInRole(Meteor.userId(), supervisor)) {
    self.next();
  } else {
    self.layout('App_body');
    self.render('App_notFound');
  }
};

export const isSupervisorOrAdmin = self => {
  if (!Meteor.user()) {
    Router.go('/');
  } else if (Roles.userIsInRole(Meteor.userId(), supervisor)) {
    self.next();
  } else if (Roles.userIsInRole(Meteor.userId(), admin)) {
    self.next();
  } else {
    self.layout('App_body');
    self.render('App_notFound');
  }
};

/**
 * Función para validar si el usuario tiene el rol de operador
 * @param {function} self
 */
export const isOperator = self => {
  if (!Meteor.user()) {
    Router.go('/');
  } else if (Roles.userIsInRole(Meteor.userId(), operator)) {
    self.next();
  } else {
    self.layout('App_body');
    self.render('App_notFound');
  }
};

/**
 * Función para validar si el usuario tiene el rol de consultor
 * @param {function} self
 */
export const isConsultant = self => {
  if (!Meteor.user()) {
    Router.go('/');
  } else if (Roles.userIsInRole(Meteor.userId(), consultant)) {
    self.next();
  } else {
    self.layout('App_body');
    self.render('App_notFound');
  }
};

/**
 * Segunda función para validar si el usuario esta logueado y permitir el acceso a la pagina,
 * si no mostrara la página de error 404
 * @param {function} self
 */
export const isLoggedIn2 = self => {
  if (Meteor.user()) {
    self.next();
  } else {
    self.layout('App_body');
    self.render('App_notFound');
  }
};
