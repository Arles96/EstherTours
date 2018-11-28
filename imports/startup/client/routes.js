import { Router } from 'meteor/iron:router';
import { Session } from 'meteor/session';
import {
  isLoggedIn, isNotLoggedIn, isAdmin, isLoggedIn2, isOperator
} from './validations';
import { Renters } from '../../api/renters/renters';

// Import layouts
import '../../ui/layouts/body/body';
import '../../ui/layouts/bodyAdmin/bodyAdmin';

// import pages
import '../../ui/pages/account/account';
import '../../ui/pages/not-found/not-found';
import '../../ui/pages/initialDashboard/initialDashboard';
import '../../ui/pages/usersPage/usersPage';
import '../../ui/pages/updateProfile/updateProfile';
import '../../ui/pages/changePassword/changePassword';
import '../../ui/pages/addRestaurant/addRestaurant';
import '../../ui/pages/renters/addRenters';
import '../../ui/pages/renters/listRenters';
<<<<<<< HEAD
import '../../ui/pages/hotel/addHotels';
import '../../ui/pages/hotel/listHotels';
=======
import '../../ui/pages/renters/editRenter';
import '../../ui/pages/renters/showInfoRenter';
>>>>>>> 617dd2f12e639fbf7d867f577fd88206413e401d

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

/**
 * Ruta que se muestra cuando el usuario olvido su contraseña
 */
AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPwd',
  template: 'forgotPwd',
  path: '/forgotPwd',
  redirect: '/'
});

/**
 * Ruta para resetear la contraseña
 */
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

/*
 * Ruta para actualizar el primer nombre y primer apellido
 */
Router.route('/update-profile', {
  name: 'updateProfile',
  template: 'updateProfile',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Actualizando Perfil']);
    isLoggedIn2(this);
  }
});

/**
 * Ruta para cambiar la contraseña del usuario
 */
Router.route('/change-password', {
  name: 'changePassword',
  template: 'changePasswordPage',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Cambiando Contraseña']);
    isLoggedIn2(this);
  }
});

/*
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

/**
 * Ruta para agregar Arrendadoras
 */
Router.route('/add-renters', {
  name: 'addRenters',
  template: 'addRenters',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Agregar Arrendadora']);
    isOperator(this);
  }
});

/**
 * Ruta para listar Arrendadoras
 */
Router.route('/list-renters', {
  name: 'listRenters',
  template: 'listRenters',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Listar Arrendadoras']);
    isOperator(this);
  }
});

/**
<<<<<<< HEAD
 * Ruta para agregar hoteles
 */
Router.route('/add-hotels', {
  name: 'addHotels',
  template: 'addHotels',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Agregar hoteles']);
    isOperator(this);
=======
 * Ruta de actualizar los datos de una arrendadora
 */
Router.route('/edit-renter/:id', {
  name: 'editRenter',
  template: 'editRenter',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return Meteor.subscribe('renter.one', id);
  },
  onBeforeAction: function () {
    listBreadcrumb(['Listar Arrendadoras', 'Actualizando Información de Arrendadora']);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      renter: Renters.findOne({ _id: id })
    };
>>>>>>> 617dd2f12e639fbf7d867f577fd88206413e401d
  }
});

/**
<<<<<<< HEAD
 * Ruta para listar hoteles
 */
Router.route('/list-hotels', {
  name: 'listHotels',
  template: 'listHotels',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Listar Hoteles']);
    isOperator(this);
=======
 * Ruta para mostrar la información de la arrendadora seleccionada para el operador
 */
Router.route('/show-renter/:id', {
  name: 'showInfoRenter',
  template: 'showInfoRenter',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return Meteor.subscribe('renter.one', id);
  },
  onBeforeAction: function () {
    const { id } = this.params;
    const renter = Renters.findOne({ _id: id });
    Session.set('idRenter', id);
    listBreadcrumb(['Listar Arrendadoras', `Mostrando Información de ${renter.name}`]);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      renter: Renters.findOne({ _id: id })
    };
>>>>>>> 617dd2f12e639fbf7d867f577fd88206413e401d
  }
});
