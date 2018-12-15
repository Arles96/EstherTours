import { Router } from 'meteor/iron:router';
import { Session } from 'meteor/session';
import {
  isLoggedIn, isNotLoggedIn, isAdmin, isLoggedIn2, isOperator, isConsultant
} from './validations';
import { Renters } from '../../api/renters/renters';
import { TransportationEstablishments } from '../../api/TransportationEstablishment/TransportationEstablishment';
import { Hotels } from '../../api/hotels/hotels';
import { Restaurants } from '../../api/restaurants/restaurants';
import { Guide } from '../../api/guide/guide';
import { Packages } from '../../api/packages/packages';

// Import layouts
import '../../ui/layouts/body/body';
import '../../ui/layouts/bodyAdmin/bodyAdmin';

// import pages
import '../../ui/pages/account/account';
import '../../ui/pages/not-found/not-found';
import '../../ui/pages/initialDashboard/initialDashboard';
import '../../ui/pages/usersPage/usersPage';
import '../../ui/pages/restaurants/addRestaurant';
import '../../ui/pages/restaurants/listRestaurants';
import '../../ui/pages/restaurants/editRestaurant';
import '../../ui/pages/restaurants/showInfoRestaurant';
import '../../ui/pages/updateProfile/updateProfile';
import '../../ui/pages/changePassword/changePassword';
import '../../ui/pages/renters/addRenters';
import '../../ui/pages/renters/listRenters';
import '../../ui/pages/TransportationEstablishment/addTransportationEstablishments';
import '../../ui/pages/TransportationEstablishment/listTransportationEstablishments';
import '../../ui/pages/TransportationEstablishment/showInfoTransportationEstablishment';
import '../../ui/pages/TransportationEstablishment/editTransportationEstablishment';
import '../../ui/pages/hotel/addHotels';
import '../../ui/pages/hotel/listHotels';
import '../../ui/pages/renters/editRenter';
import '../../ui/pages/renters/showInfoRenter';
import '../../ui/pages/hotel/showInfoHotel';
import '../../ui/pages/hotel/editHotel';
import '../../ui/pages/guide/addGuide';
import '../../ui/pages/guide/listGuide';
import '../../ui/pages/guide/editGuide';
import '../../ui/pages/packages/addPackages';
import '../../ui/pages/packages/listPackages';
import '../../ui/pages/packages/editPackages';
import '../../ui/pages/packages/showPackage';
import '../../ui/pages/findPackage/findPackage';
import '../../ui/pages/resultPackages/resultPackages';
import '../../ui/pages/findTransport/findTransport';
import '../../ui/pages/resultTransport/resultTransport';

/**
 *Función para listar en el componente breadcrumb
 * @param {Array} list
 */
function listBreadcrumb (list) {
  Session.set('listBreadcrumb', list);
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
  name: 'addRestaurants',
  template: 'addRestaurant',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Agregar Restaurante']);
    isOperator(this);
  }
});

Router.route('/listRestaurants', {
  name: 'listRestaurants',
  template: 'listRestaurants',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Tabla de Restaurantes']);
    isOperator(this);
  }
});

/**
 * Ruta de actualizar los datos de un restaurante
 */
Router.route('/edit-restaurant/:id', {
  name: 'editRestaurant',
  template: 'editRestaurant',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return Meteor.subscribe('restaurant.one', id);
  },
  onBeforeAction: function () {
    listBreadcrumb(['Listar Restaurantes', 'Actualizando Información de Restaurante']);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      restaurant: Restaurants.findOne({ _id: id })
    };
  }
});

/**
 * Ruta para mostrar la información de un restaurante seleccionado para el operador
 */
Router.route('/show-restaurant/:id', {
  name: 'showInfoRestaurant',
  template: 'showInfoRestaurant',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return Meteor.subscribe('restaurant.one', id);
  },
  onBeforeAction: function () {
    const { id } = this.params;
    const restaurant = Restaurants.findOne({ _id: id });
    Session.set('idRestaurant', id);
    listBreadcrumb(['Listar Restaurantes', `Mostrando Información de ${restaurant.name}`]);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      restaurant: Restaurants.findOne({ _id: id })
    };
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
    listBreadcrumb(['Tabla de Arrendadoras']);
    isOperator(this);
  }
});

/**
 * Ruta para agregar Establecimientos de transporte
 */
Router.route('/add-transportation-establishment', {
  name: 'addTransportationEstablishments',
  template: 'addTransportationEstablishments',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Agregar Transporte']);
    isOperator(this);
  }
});

/**
 * Ruta para listar Establecimientos de transporte
 */
Router.route('/list-transportation-establishment', {
  name: 'listTransportationEstablishments',
  template: 'listTransportationEstablishments',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Tabla Transporte']);
    isOperator(this);
  }
});

/**
 * Ruta para mostrar la información de la arrendadora seleccionada para el operador
 */
Router.route('/show-TransportationEstablishment/:id', {
  name: 'showInfoTransportationEstablishment',
  template: 'showInfoTransportationEstablishment',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return Meteor.subscribe('TransportationEstablishment.one', id);
  },
  onBeforeAction: function () {
    const { id } = this.params;
    const TransportationEstablishment = TransportationEstablishments.findOne({ _id: id });
    Session.set('idTransportationEstablishment', id);
    listBreadcrumb(['Lista de transportes', `Mostrando Información de ${TransportationEstablishment.name}`]);
    isLoggedIn2(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      TransportationEstablishment: TransportationEstablishments.findOne({ _id: id })
    };
  }
});

/**
 * Ruta de actualizar los datos de un transporte
 */
Router.route('/edit-TransportationEstablishment/:id', {
  name: 'editTransportationEstablishment',
  template: 'editTransportationEstablishment',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return Meteor.subscribe('TransportationEstablishment.one', id);
  },
  onBeforeAction: function () {
    listBreadcrumb(['Lista de transportes', 'Actualizando Información de Transporte']);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      TransportationEstablishment: TransportationEstablishments.findOne({ _id: id })
    };
  }
});

/*
 * Ruta para agregar hoteles
 */
Router.route('/add-hotels', {
  name: 'addHotels',
  template: 'addHotels',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Agregar hoteles']);
    isOperator(this);
  }
});

/**
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
  }
});

/**
 * Ruta para listar hoteles
 */
Router.route('/list-hotels', {
  name: 'listHotels',
  template: 'listHotels',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Listar Hoteles']);
    isOperator(this);
  }
});

/**
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
  }
});

/**
 * Ruta de actualizar los datos de un hotel
 */
Router.route('/edit-hotel/:id', {
  name: 'editHotel',
  template: 'editHotel',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return Meteor.subscribe('hotel.one', id);
  },
  onBeforeAction: function () {
    listBreadcrumb(['Listar Hoteles', 'Actualizando Información de Hotel']);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      hotel: Hotels.findOne({ _id: id })
    };
  }
});

/**
 * Ruta para agregar información de Guias
 */

Router.route('/add-guide', {
  name: 'addGuide',
  template: 'addGuide',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Agregar Guía']);
    isOperator(this);
  }
});

/**
 * Ruta para mostrar la información del hotel seleccionado para el operador
 */
Router.route('/show-hotel/:id', {
  name: 'showInfoHotel',
  template: 'showInfoHotel',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return Meteor.subscribe('hotel.one', id);
  },
  onBeforeAction: function () {
    const { id } = this.params;
    const hotel = Hotels.findOne({ _id: id });
    Session.set('idHotel', id);
    listBreadcrumb(['Listar Hoteles', `Mostrando Información de ${hotel.name}`]);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      hotel: Hotels.findOne({ _id: id })
    };
  }
});

/**
 * Ruta para listar los guías
 */
Router.route('/list-guide', {
  name: 'listGuide',
  template: 'listGuide',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Tabla de Guías']);
    isOperator(this);
  }
});

Router.route('/edit-guide/:id', {
  name: 'editGuide',
  template: 'editGuide',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return Meteor.subscribe('guide.one', id);
  },
  onBeforeAction: function () {
    listBreadcrumb(['Listar Guías', 'Actualizando Información de Guías']);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      guide: Guide.findOne({ _id: id })
    };
  }
});

/**
 * Ruta para el formulario de consultas de establecimientos de transporte
 */
Router.route('/find-transport', {
  name: 'findTransport',
  template: 'findTransport',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Formulario Consulta Transporte']);
    isConsultant(this);
  }
});

/**
 * Ruta para mostrar los resultados de la busqueda de establecimientos de transporte
 */
Router.route('/result-find-transport', {
  name: 'resultTransport',
  template: 'resultTransport',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Formulario Consulta Transporte', 'Resultado Consulta Transporte']);
    isConsultant(this);
  }
});

/**
 * Ruta para agregar paquetes
 */
Router.route('/add-packages', {
  name: 'addPackages',
  template: 'addPackages',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('hotels.all'),
      Meteor.subscribe('guide.all'),
      Meteor.subscribe('renter.all'),
      Meteor.subscribe('restaurant.all'),
      Meteor.subscribe('transport.all'),
      Meteor.subscribe('Routes.all'),
      Meteor.subscribe('fleetRenter.all'),
      Meteor.subscribe('RoomHotel.all')
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Agregar Paquetes']);
    isOperator(this);
  }
});

/**
 * Ruta para listar todos los paquetes
 */
Router.route('/list-packages', {
  name: 'listPackages',
  template: 'listPackages',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Tabla de Paquetes']);
    isOperator(this);
  }
});

/**
 * Ruta para actualizar la información de paquetes
 */
Router.route('/edit-package/:id', {
  name: 'editPackages',
  template: 'editPackages',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return [
      Meteor.subscribe('hotels.all'),
      Meteor.subscribe('guide.all'),
      Meteor.subscribe('renter.all'),
      Meteor.subscribe('restaurant.all'),
      Meteor.subscribe('transport.all'),
      Meteor.subscribe('Routes.all'),
      Meteor.subscribe('fleetRenter.all'),
      Meteor.subscribe('RoomHotel.all'),
      Meteor.subscribe('OnePackage', id)
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Listar Paquetes', 'Actualizando Información de Paquetes']);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      package: Packages.findOne({ _id: id })
    };
  }
});

/**
 * Ruta para mostrar información de un paquete
 */
Router.route('/show-package/:id', {
  name: 'showPackage',
  template: 'showPackage',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return [
      Meteor.subscribe('hotels.all'),
      Meteor.subscribe('guide.all'),
      Meteor.subscribe('renter.all'),
      Meteor.subscribe('restaurant.all'),
      Meteor.subscribe('transport.all'),
      Meteor.subscribe('Routes.all'),
      Meteor.subscribe('fleetRenter.all'),
      Meteor.subscribe('RoomHotel.all'),
      Meteor.subscribe('OnePackage', id)
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Listar Paquetes', 'Mostrando Información de Paquetes']);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      package: Packages.findOne({ _id: id })
    };
  }
});

/**
 * Ruta para el formulario de consultas de paquetes
 */
Router.route('/find-packages', {
  name: 'findPackage',
  template: 'findPackage',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('hotels.all'),
      Meteor.subscribe('guide.all'),
      Meteor.subscribe('renter.all'),
      Meteor.subscribe('restaurant.all'),
      Meteor.subscribe('transport.all'),
      Meteor.subscribe('Routes.all'),
      Meteor.subscribe('fleetRenter.all'),
      Meteor.subscribe('RoomHotel.all')
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Formulario Consulta Paquetes']);
    isConsultant(this);
  }
});

/**
 * Ruta para mostrar los resultados de la busqueda de paquetes
 */
Router.route('/result-find-packages', {
  name: 'resultPackages',
  template: 'resultPackages',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Formulario Consulta Paquetes', 'Resultado Consulta Paquetes']);
    isConsultant(this);
  }
});
