import { Router } from 'meteor/iron:router';
import { Session } from 'meteor/session';
import { isLoggedIn, isNotLoggedIn, isAdmin } from './validations';

// Import layouts
import '../../ui/layouts/body/body';
import '../../ui/layouts/bodyAdmin/bodyAdmin';

// import pages
import '../../ui/pages/account/account';
import '../../ui/pages/not-found/not-found';
import '../../ui/pages/initialDashboard/initialDashboard';
import '../../ui/pages/usersPage/usersPage';
import '../../ui/pages/addRestaurant/addRestaurant';

/**
 *Función para listar en el componente breadcrumb
 * @param {Array} list
 */
function listBreadcrumb (list) {
  Session.set('listBreadcrum', list);
}

/**
 * Configuración de la página 404
 */
Router.configure({
  layoutTemplate: 'App_body',
  notFoundTemplate: 'App_notFound'
});

/**
 * Ruta de iniciar sesión
 */
Router.route('/', {
  name: 'home',
  template: 'signIn',
  onBeforeAction: function () {
    isNotLoggedIn(this);
  }
});

/**
 * Ruta de la página principal del dashboard
 */
Router.route('/dashboard', {
  name: 'dashboard',
  layoutTemplate: 'bodyAdmin',
  template: 'initialDashboard',
  onBeforeAction: function () {
    listBreadcrumb(['Visión General']);
    isLoggedIn(this);
  }
});

/**
 * Reset Password, verify email and forgot password
 */
Router.route('/verify-email/:token', {
  name: 'verifyEmail',
  action: function () {
    Accounts.verifyEmail(this.params.token, error => {
      if (error) {
        Router.go('/');
      } else {
        Router.go('/');
      }
    });
  }
});

AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPwd',
  template: 'forgotPwd',
  path: '/forgotPwd',
  redirect: '/'
});

Router.route('/reset-password/:token', {
  name: 'reset',
  layoutTemplate: 'App_body',
  template: 'resetPass',
  onBeforeAction: function () {
    if (Meteor.user()) {
      Router.go('/dashboard');
    } else {
      AccountsTemplates.paramToken = this.params.token;
      this.next();
    }
  }
});

/**
 * Rutas para Usuarios
 */
Router.route('/users', {
  name: 'users',
  template: 'usersPage',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Usuarios']);
    isAdmin(this);
  }
});

/**
 * Rutas para Restaurantes
*/
Router.route('/addRestaurant', {
  name: 'restaurants',
  template: 'addRestaurant',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Agregar Restaurante']);
    isAdmin(this);
  }
});
