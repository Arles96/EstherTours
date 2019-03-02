import { Router } from 'meteor/iron:router';
import { Session } from 'meteor/session';
import {
  isLoggedIn, isNotLoggedIn, isSupervisorOrAdmin, isLoggedIn2, isOperator, isConsultant, isAdmin
} from './validations';
import { Renters } from '../../api/renters/renters';
import { TransportationEstablishments } from '../../api/TransportationEstablishment/TransportationEstablishment';
import { Hotels } from '../../api/hotels/hotels';
import { Restaurants } from '../../api/restaurants/restaurants';
import { Guide } from '../../api/guide/guide';
import { Packages } from '../../api/packages/packages';
import { Attractions } from '../../api/attractions/attractions';
import { FleetRenter } from '../../api/renters/fleetRenter';
import { RouteTransportationEstablishment } from '../../api/TransportationEstablishment/RouteTransportationEstablishment';
import { RoomHotel } from '../../api/hotels/roomhotel';

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
import '../../ui/pages/restaurants/branchRestaurant';
import '../../ui/pages/restaurants/filterRestaurants';
import '../../ui/pages/restaurants/showInfoRestaurant';
import '../../ui/pages/restaurantConsults/consultRestaurant';
import '../../ui/pages/restaurantConsults/listRestaurantResults';
import '../../ui/pages/updateProfile/updateProfile';
import '../../ui/pages/changePassword/changePassword';
import '../../ui/pages/renters/addRenters';
import '../../ui/pages/renters/listRenters';
import '../../ui/pages/renters/filterFleetRenters';
import '../../ui/pages/renters/filterRenters';
import '../../ui/pages/renters/branchRenter';
import '../../ui/pages/TransportationEstablishment/addTransportationEstablishments';
import '../../ui/pages/TransportationEstablishment/listTransportationEstablishments';
import '../../ui/pages/TransportationEstablishment/filterTransportationEstablishments';
import '../../ui/pages/TransportationEstablishment/filterRouteTransportationEstablishments';
import '../../ui/pages/TransportationEstablishment/showInfoTransportationEstablishment';
import '../../ui/pages/TransportationEstablishment/editTransportationEstablishment';
import '../../ui/pages/TransportationEstablishment/reportTransportationEstablishment/reportTransportationEstablishment';
import '../../ui/pages/hotel/addHotels';
import '../../ui/pages/hotel/branchHotel';
import '../../ui/pages/hotel/listHotels';
import '../../ui/pages/hotel/filterHotels';
import '../../ui/pages/hotel/filterRoomHotel';
import '../../ui/pages/hotelQuery/hotelQuery';
import '../../ui/pages/hotelQuery/showQueryHotel';
import '../../ui/pages/hotel/reportHotels/reportHotels';
import '../../ui/pages/renters/editRenter';
import '../../ui/pages/renters/showInfoRenter';
import '../../ui/pages/renters/reportRenters/reportRenters';
import '../../ui/pages/hotel/showInfoHotel';
import '../../ui/pages/hotel/editHotel';
import '../../ui/pages/attraction/filterAttractions';
import '../../ui/pages/attraction/addAttractions';
import '../../ui/pages/attraction/listAttractions';
import '../../ui/pages/attraction/editAttractions';
import '../../ui/pages/attraction/reportAttractions/reportAttractions';
import '../../ui/pages/attractionQuery/attractionQuery';
import '../../ui/pages/attractionQuery/showQueryAttraction';
import '../../ui/pages/attraction/showInfoAttraction';
import '../../ui/pages/guide/addGuide';
import '../../ui/pages/guide/listGuide';
import '../../ui/pages/guide/editGuide';
import '../../ui/pages/guide/reportGuides/reportGuides';
import '../../ui/pages/findGuide/findGuide';
import '../../ui/pages/resultGuide/resultGuide';
import '../../ui/pages/packages/addPackages';
import '../../ui/pages/packages/listPackages';
import '../../ui/pages/packages/editPackages';
import '../../ui/pages/packages/showPackage';
import '../../ui/pages/packages/reportPackages/reportPackages';
import '../../ui/pages/restaurants/reportRestaurants/reportRestaurants';
import '../../ui/pages/findPackage/findPackage';
import '../../ui/pages/resultPackages/resultPackages';
import '../../ui/pages/RenterQuary/findRenters';
import '../../ui/pages/RenterQuary/showRenters';
import '../../ui/pages/findTransport/findTransport';
import '../../ui/pages/resultTransport/resultTransport';
import '../../ui/pages/branchOfficePage/officesPage';
<<<<<<< HEAD
import '../../ui/pages/packages/filterPackage';
import '../../ui/pages/soldPackage/listSoldPackage';
import '../../ui/pages/subscriptions/listSubscriptions';
import '../../ui/pages/shoppingPackage/shoppingPackage';
import { FleetRenter } from '../../api/renters/fleetRenter';
import { RouteTransportationEstablishment } from '../../api/TransportationEstablishment/RouteTransportationEstablishment';
import { RoomHotel } from '../../api/hotels/roomhotel';
=======
import '../../ui/pages/ChatPage/ChatPage';
import '../../ui/pages/shoppingPackage/shoppingPackage';
import '../../ui/pages/Activities/activities';
import '../../ui/pages/packages/filterPackage';
import '../../ui/pages/soldPackage/listSoldPackage';
>>>>>>> 574de0b291cadc2ddeddd07245a4f9f53129605c

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
    Session.set('ShowChatFixed', true);
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
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
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
  waiton: function () {
    return [
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('branchOffices.all'),
      Meteor.subscribe('chats.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Usuarios']);
    isSupervisorOrAdmin(this);
  }
});

/**
 * Rutas para sucursales
 */
Router.route('/offices', {
  name: 'offices',
  template: 'officePage',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Sucursales']);
    isSupervisorOrAdmin(this);
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
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Actualizando Perfil']);
    isLoggedIn2(this);
  },
  waitOn: function () {
    return [
      Meteor.subscribe('imageProfile.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  }
});

/**
 * Ruta para cambiar la contraseña del usuario
 */
Router.route('/change-password', {
  name: 'changePassword',
  template: 'changePasswordPage',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
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
  waitOn: function () {
    return [
      Meteor.subscribe('restaurantImage.all'),
      Meteor.subscribe('restaurant.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Agregar Restaurante']);
    Session.set('rating', undefined);
    Session.set('ShowChatFixed', true);
    Session.set('price', undefined);
    isOperator(this);
  }
});

Router.route('/consult-restaurant', {
  name: 'consult-restaurant',
  template: 'consultRestaurant',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Consulta de Restaurante']);
    Session.set('findRestaurantRating', undefined);
    isConsultant(this);
  }
});

Router.route('/listRestaurants', {
  name: 'listRestaurants',
  template: 'listRestaurants',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('restaurant.one'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Tabla de Restaurantes']);
    isOperator(this);
  }
});

/*
 * Ruta para filtrar restaurantes
 */
Router.route('/filter-restaurants', {
  name: 'filterRestaurants',
  template: 'filterRestaurants',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('restaurant.all'),
      Meteor.subscribe('restaurantImage.all')
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Filtrar restaurantes']);
    isLoggedIn2(this);
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
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('restaurant.one', id),
      Meteor.subscribe('restaurant.all', id),
      Meteor.subscribe('restaurantImage.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    const { id } = this.params;
    const restaurant = Restaurants.findOne({ _id: id });
    Session.set('idRestaurant', id);
    Session.set('showRestaurantRating', undefined);
    listBreadcrumb(['Listar Restaurantes', `Mostrando Información de ${restaurant.name}`]);
    isLoggedIn2(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      restaurant: Restaurants.findOne({ _id: id })
    };
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
    return [
      Meteor.subscribe('restaurant.one', id),
      Meteor.subscribe('restaurant.all', id),
      Meteor.subscribe('restaurantImage.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Listar Restaurantes', 'Actualizando Información de Restaurante']);
    Session.set('editRestaurantRating', undefined);
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
 * Ruta para agregar sucursal a un restaurante
 */
Router.route('/branch-restaurant/:id', {
  name: 'branchRestaurant',
  template: 'branchRestaurant',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return [
      Meteor.subscribe('restaurant.one', id),
      Meteor.subscribe('restaurantImage.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    const { id } = this.params;
    const restaurant = Restaurants.findOne({ _id: id });
    listBreadcrumb(['Listar Restaurantes', `Agregar sucursal a ${restaurant.name}`]);
    Session.set('branchRestaurantRating', undefined);
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
Router.route('/show-restaurantResult', {
  name: 'listRestaurantResults',
  template: 'listRestaurantResults',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Formulario Consulta Restaurante', 'Resultado Consulta Restaurante']);
    Session.set('categorization', undefined);
    isConsultant(this);
  }
});

/**
 * Ruta para agregar Arrendadoras
 */
Router.route('/add-renters', {
  name: 'addRenters',
  template: 'addRenters',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('renter.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Agregar Arrendadora']);
    Session.set('categorization', undefined);
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
  waitOn: function () {
    return [
      Meteor.subscribe('FleetRenterImage.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('renter.one')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Tabla de Arrendadoras']);
    isOperator(this);
  }
});

/*
 * Ruta para filtrar flota de arrendadoras
 */
Router.route('/filter-fleet-renters', {
  name: 'filterFleetRenters',
  template: 'filterFleetRenters',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('renter.all'),
      Meteor.subscribe('renter.one'),
      Meteor.subscribe('FleetRenterImage.all'),
      Meteor.subscribe('fleetRenter.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Filtrar flotas']);
    isLoggedIn2(this);
  }
});

/*
 * Ruta para filtrar arrendadoras
 */
Router.route('/filter-renters', {
  name: 'filterRenters',
  template: 'filterRenters',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('renter.all')
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Filtrar arrendadoras']);
    isLoggedIn2(this);
  }
});

/**
 * Ruta para consulta de Arrendadoras
 */
Router.route('/find-renters', {
  name: 'findRenters',
  template: 'findRenters',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Consulta Arrendadora']);
    Session.set('categorization', undefined);
    isConsultant(this);
  }
});

/**
 * Ruta para mostrar la información dada por el consultor al hacer la contulta de arrendadoras
 */
Router.route('/show-renterQuary/', {
  name: 'showRenters',
  template: 'showRenters',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Resultado Consulta Arrendadora']);
    isConsultant(this);
  }
});

/**
 * Ruta para agregar Establecimientos de trasporte
 */
Router.route('/add-transportation-establishment', {
  name: 'addTransportationEstablishments',
  template: 'addTransportationEstablishments',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Agregar Transporte']);
    Session.set('transportCategorization', undefined);
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
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Tabla Transporte']);
    isOperator(this);
  }
});

/*
 * Ruta para filtrar establecimientos de transporte
 */
Router.route('/filter-transportation-establishment', {
  name: 'filterTE',
  template: 'filterTE',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('transport.all')
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Filtrar Transporte']);
    isLoggedIn2(this);
  }
});

/*
 * Ruta para filtrar rutas de transporte
 */
Router.route('/filter-route-transportation-establishment', {
  name: 'filterRouteTE',
  template: 'filterRouteTE',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('transport.all'),
      Meteor.subscribe('Routes.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Filtrar rutas']);
    isLoggedIn2(this);
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
    return [
      Meteor.subscribe('TransportationEstablishment.one', id),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    const { id } = this.params;
    const TransportationEstablishment = TransportationEstablishments.findOne({ _id: id });
    Session.set('idTransportationEstablishment', id);
    Session.set('showTransportationRating', undefined);
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
    return [
      Meteor.subscribe('TransportationEstablishment.one', id),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Lista de transportes', 'Actualizando Información de Transporte']);
    Session.set('editTransportationEstablishmentCategorization', undefined);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      TransportationEstablishment: TransportationEstablishments.findOne({ _id: id })
    };
  }
});

/**
 * Ruta de reportes de transporte
 */
Router.route('/report-transportation-establishment', {
  name: 'reportTransportationEstablishments',
  template: 'reportTransportationEstablishments',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Reportar transportes']);
    isLoggedIn2(this);
  }
});

/**
 * Ruta de reportes de arrendadoras
 */
Router.route('/report-renters', {
  name: 'reportRenters',
  template: 'reportRenters',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Reportar arrendadoras']);
    isLoggedIn2(this);
  }
});

/**
 * Ruta de reportes de hoteles
 */
Router.route('/report-hotels', {
  name: 'reportHotels',
  template: 'reportHotels',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Reportar hoteles']);
    isLoggedIn2(this);
  }
});

/**
 * Ruta de reportes de guías
 */
Router.route('/report-guides', {
  name: 'reportGuides',
  template: 'reportGuides',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Reportar guías']);
    isLoggedIn2(this);
  }
});

/**
 * Ruta de reportes de atracciones
 */
Router.route('/report-attractions', {
  name: 'reportAttractions',
  template: 'reportAttractions',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Reportar atracciones']);
    isLoggedIn2(this);
  }
});

/**
 * Ruta de reportes de restaurantes
 */
Router.route('/report-restaurants', {
  name: 'reportRestaurants',
  template: 'reportRestaurants',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Reportar restaurantes']);
    isLoggedIn2(this);
  }
});

/**
 * Ruta de reportes de paquetes
 */
Router.route('/report-packages', {
  name: 'reportPackages',
  template: 'reportPackages',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Reportar paquetes']);
    isLoggedIn2(this);
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
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Agregar hoteles']);
    Session.set('hotelCategorization', undefined);
    isOperator(this);
  },
  waitOn: function () {
    return [
      Meteor.subscribe('hotelImage.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
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
    return [
      Meteor.subscribe('renter.one', id),
      Meteor.subscribe('renter.all', id),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Listar Arrendadoras', 'Actualizando Información de Arrendadora']);
    Session.set('editRenterCategorization', undefined);
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
 * Ruta para agregar sucursal a una arrendadora
 */
Router.route('/branch-renter/:id', {
  name: 'branchRenter',
  template: 'branchRenter',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return [
      Meteor.subscribe('renter.one', id),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    const { id } = this.params;
    const renter = Renters.findOne({ _id: id });
    listBreadcrumb(['Listar Arrendadoras', `Agregar sucursal a ${renter.name}`]);
    Session.set('branchRenterRating', undefined);
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
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Tabla de Hoteles']);
    isOperator(this);
  },
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  }
});

Router.route('/branch-hotel/:id', {
  name: 'branchHotel',
  template: 'branchHotel',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return [
      Meteor.subscribe('hotel.one', id),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    const { id } = this.params;
    const hotel = Hotels.findOne({ _id: id });
    listBreadcrumb(['Listar Hoteles', `Agregar sucursal a ${hotel.name}`]);
    Session.set('branchHotelRating', undefined);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      hotel: Hotels.findOne({ _id: id })
    };
  }
});

/*
 * Ruta para filtrar habitaciones
 */
Router.route('/filter-room-hotel', {
  name: 'filterRoomHotel',
  template: 'filterRoomHotel',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('hotels.all'),
      Meteor.subscribe('hotelImage.all'),
      Meteor.subscribe('RoomHotel.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Filtrar habitaciones']);
    isLoggedIn2(this);
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
    return [
      Meteor.subscribe('renter.one', id),
      Meteor.subscribe('renter.all', id),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('FleetRenterImage.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    const { id } = this.params;
    const renter = Renters.findOne({ _id: id });
    Session.set('idRenter', id);
    Session.set('showRenterRating', undefined);
    listBreadcrumb(['Listar Arrendadoras', `Mostrando Información de ${renter.name}`]);
    isLoggedIn2(this);
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
    return [
      Meteor.subscribe('hotel.one', id),
      Meteor.subscribe('hotelImage.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Listar Hoteles', 'Actualizando Información de Hotel']);
    Session.set('editHotelCategorization', undefined);
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
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Agregar Guía']);
    Session.set('guideCategorization', undefined);
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
    return [
      Meteor.subscribe('hotel.one', id),
      Meteor.subscribe('hotelImage.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    const { id } = this.params;
    const hotel = Hotels.findOne({ _id: id });
    Session.set('idHotel', id);
    Session.set('showHotelRating', undefined);
    listBreadcrumb(['Listar Hoteles', `Mostrando Información de ${hotel.name}`]);
    isLoggedIn2(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      hotel: Hotels.findOne({ _id: id })
    };
  }
});

/*
 * Ruta para filtrar hoteles
 */
Router.route('/filter-hotels', {
  name: 'filterHotels',
  template: 'filterHotels',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('hotels.all'),
      Meteor.subscribe('hotelImage.all')
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Filtrar hoteles']);
    isLoggedIn2(this);
  }
});

Router.route('/hotel-query', {
  name: 'hotelQuery',
  template: 'hotelQuery',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Consulta de hoteles']);
    Session.set('hotelQCategorization', undefined);
    isConsultant(this);
  },
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  }
});

Router.route('/show-query-hotel', {
  name: 'showQueryHotel',
  template: 'showQueryHotel',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Consulta de hoteles']);
    isConsultant(this);
  },
  data: function () {
    return {
      hotel: Session.get('hotelQueryDoc').docVals
    };
  }
});

/*
 * Ruta para filtrar atracciones
 */
Router.route('/filter-attractions', {
  name: 'filterAttractions',
  template: 'filterAttractions',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('attractions.all'),
      Meteor.subscribe('attractionImage.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Filtrar atracciones']);
    isLoggedIn2(this);
  }
});

/*
 * Ruta para agregar atracciones
 */
Router.route('/add-attractions', {
  name: 'addAttractions',
  template: 'addAttractions',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Agregar atracciones']);
    Session.set('attractionCategorization', undefined);
    isOperator(this);
  },
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('guide.all'),
      Meteor.subscribe('attractionImage.all')
    ];
  }
});

/**
 * Ruta para listar atracciones
 */
Router.route('/list-attractions', {
  name: 'listAttractions',
  template: 'listAttractions',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Listar Atracciones']);
    isOperator(this);
  }
});

/**
 * Ruta para editar atracciones
 */
Router.route('/edit-attractions/:id', {
  name: 'editAttractions',
  template: 'editAttractions',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('attraction.one', this.params.id),
      Meteor.subscribe('guide.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('attractionImage.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Listar Atracciones', 'Actualizando Información de Atraccion']);
    Session.set('editAttractionCategorization', undefined);
    isOperator(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      attractions: Attractions.findOne({ _id: id })
    };
  }
});

/**
 * Ruta para mostrar la información de la atraccion seleccionado para el operador
 */
Router.route('/show-attraction/:id', {
  name: 'showInfoAttraction',
  template: 'showInfoAttraction',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return [
      Meteor.subscribe('attraction.one', id),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('guide.all'),
      Meteor.subscribe('attractionImage.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    const { id } = this.params;
    const attraction = Attractions.findOne({ _id: id });
    Session.set('idAttraction', id);
    listBreadcrumb(['Listar Atracciones', `Mostrando Información de ${attraction.name}`]);
    isLoggedIn2(this);
  },
  data: function () {
    const { id } = this.params;
    return {
      attraction: Attractions.findOne({ _id: id })
    };
  }
});

Router.route('/attraction-query', {
  name: 'attractionQuery',
  template: 'attractionQuery',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Consulta de Atracciones']);
    Session.set('attractionQCategorization', undefined);
    isConsultant(this);
  },
  waitOn: function () {
    return [
      Meteor.subscribe('guide.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  }
});

Router.route('/show-query-attraction', {
  name: 'showQueryAttraction',
  template: 'showQueryAttraction',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Consulta de atracciones']);
    isConsultant(this);
  },
  data: function () {
    return {
      attraction: Session.get('attractionQueryDoc').docVals
    };
  },
  waitOn: function () {
    return [
      Meteor.subscribe('guide.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
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
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Tabla de Guías']);
    isOperator(this);
  },
  waitOn: function () {
    return [
      Meteor.subscribe('guide.all'),
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  }
});

Router.route('/edit-guide/:id', {
  name: 'editGuide',
  template: 'editGuide',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    const { id } = this.params;
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('guide.one', id)
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Listar Guías', 'Actualizando Información de Guías']);
    Session.set('editGuideCategorization', undefined);
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
 * Ruta para buscar guías
 */
Router.route('/find-guide', {
  name: 'findGuide',
  template: 'findGuide',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Formulario Consulta Guía']);
    Session.set('findGuideCategorization', undefined);
    isLoggedIn2(this);
  },
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  }
});
/**
* Ruta para mostrar los resultados de la busqueda de guías
*/
Router.route('/result-find-guide', {
  name: 'resultGuide',
  template: 'resultGuide',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Formulario Consulta Guía', 'Resultado Consulta Guía']);
    isConsultant(this);
  },
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
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
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Formulario Consulta Transporte']);
    Session.set('findTransportCategorization', undefined);
    isConsultant(this);
  },
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  }
});

/**
 * Ruta para mostrar los resultados de la busqueda de establecimientos de transporte
 */
Router.route('/result-find-transport', {
  name: 'resultTransport',
  template: 'resultTransport',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
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
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('hotels.all'),
      Meteor.subscribe('hotelImage.all'),
      Meteor.subscribe('RoomHotel.all'),
      Meteor.subscribe('transport.all'),
      Meteor.subscribe('Routes.all'),
      Meteor.subscribe('renter.all'),
      Meteor.subscribe('FleetRenterImage.all'),
      Meteor.subscribe('fleetRenter.all'),
      Meteor.subscribe('restaurant.all'),
      Meteor.subscribe('restaurantImage.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Agregar Paquetes']);
    isLoggedIn2(this);
  }
});

/**
 * Ruta para listar todos los paquetes
 */
Router.route('/list-packages', {
  name: 'listPackages',
  template: 'listPackages',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Tabla de Paquetes']);
    Session.set('listPackages', undefined);
    isLoggedIn2(this);
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
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('hotels.all'),
      Meteor.subscribe('hotelImage.all'),
      Meteor.subscribe('RoomHotel.all'),
      Meteor.subscribe('transport.all'),
      Meteor.subscribe('Routes.all'),
      Meteor.subscribe('renter.all'),
      Meteor.subscribe('FleetRenterImage.all'),
      Meteor.subscribe('fleetRenter.all'),
      Meteor.subscribe('restaurant.all'),
      Meteor.subscribe('restaurantImage.all'),
      Meteor.subscribe('OnePackage', id)
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
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
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('hotels.all'),
      Meteor.subscribe('attractions.all'),
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
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Listar Paquetes', 'Mostrando Información de Paquetes']);
    isLoggedIn2(this);
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
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all'),
      Meteor.subscribe('hotels.all'),
      Meteor.subscribe('attractions.all'),
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
    Session.set('ShowChatFixed', true);
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
  waitOn: function () {
    return [
      Meteor.subscribe('notifications.all'),
      Meteor.subscribe('chats.all'),
      Meteor.subscribe('allUsers.all')
    ];
  },
  onBeforeAction: function () {
    Session.set('ShowChatFixed', true);
    listBreadcrumb(['Formulario Consulta Paquetes', 'Resultado Consulta Paquetes']);
    isConsultant(this);
  }
});

/**
<<<<<<< HEAD
 * Ruta para filtrar Paquetes
 */
Router.route('/filter-packages', {
  name: 'filterPackage',
  template: 'filterPackage',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Filtros de Paquetes']);
    isLoggedIn2(this);
  }
});

/**
 * Ruta de Paquetes Vendidos
 */
Router.route('/sold-package', {
  name: 'soldPackage',
  template: 'listSoldPackage',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Tabla de Paquetes Vendidos']);
    isLoggedIn2(this);
  }
});

/**
 * Ruta tabla de Suscripciónes
 */
Router.route('/list-subscriptions', {
  name: 'listSubscriptions',
  template: 'listSubscriptions',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('subscriptions.all')
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Tabla de Suscripciónes']);
    isConsultant(this);
=======
 * Ruta para página de chat
 */
Router.route('/ChatPage', {
  name: 'ChatPage',
  template: 'chatPage',
  layoutTemplate: 'bodyAdmin',
  waitOn: () => [
    Meteor.subscribe('notifications.all'),
    Meteor.subscribe('chats.all'),
    Meteor.subscribe('allUsers.all')
  ],
  onBeforeAction: function () {
    Session.set('ShowChatFixed', false);
    listBreadcrumb(['Mensajes']);
    isLoggedIn(this);
>>>>>>> 574de0b291cadc2ddeddd07245a4f9f53129605c
  }
});

/**
 * Ruta de creacion de empaquetado
 */
Router.route('/adding-package', {
  name: 'addingPackage',
  template: 'shoppingPackage',
  layoutTemplate: 'bodyAdmin',
  waitOn: function () {
    return [
      Meteor.subscribe('hotels.all'),
      Meteor.subscribe('attractions.all'),
      Meteor.subscribe('guide.all'),
      Meteor.subscribe('renter.all'),
      Meteor.subscribe('restaurant.all'),
      Meteor.subscribe('transport.all'),
      Meteor.subscribe('Routes.all'),
      Meteor.subscribe('fleetRenter.all'),
      Meteor.subscribe('RoomHotel.all'),
      Meteor.subscribe('hotelImage.all'),
      Meteor.subscribe('attractionImage.all'),
      Meteor.subscribe('FleetRenterImage.all'),
      Meteor.subscribe('restaurantImage.all')
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Creando paquetes']);
    isLoggedIn(this);
  },
  data: function () {
    const hotel = Hotels.findOne({ _id: Session.get('packageHotel') });
    const restaurant = Restaurants.findOne({ _id: Session.get('packageRestaurant') });
    const renter = Renters.findOne({ _id: Session.get('packageRenter') });
    const transportationEstablishment = TransportationEstablishments.findOne({ _id: Session.get('packageTransport') });
    const fleetRenter = FleetRenter.findOne({ _id: Session.get('packageFleetRenter') });
    const roomHotel = RoomHotel.findOne({ _id: Session.get('packageRoomHotel') });
    const routeTransport = RouteTransportationEstablishment.findOne({ _id: Session.get('packageRouteTransport') });
    const attraction = Attractions.findOne({ _id: Session.get('packageAttraction') });
    return {
      hotel,
      attraction,
      fleetRenter,
      roomHotel,
      routeTransport,
      restaurant,
      renter,
      transportationEstablishment
    };
<<<<<<< HEAD
=======
  }
});

Router.route('/activities', {
  name: 'userActivities',
  template: 'userActivities',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Tabla de actividades']);
    isAdmin(this);
  }
});

/**
 * Ruta para filtrar Paquetes
 */
Router.route('/filter-packages', {
  name: 'filterPackage',
  template: 'filterPackage',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Filtros de Paquetes']);
    isLoggedIn2(this);
  }
});

/**
 * Ruta de Paquetes Vendidos
 */
Router.route('/sold-package', {
  name: 'soldPackage',
  template: 'listSoldPackage',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Tabla de Paquetes Vendidos']);
    isLoggedIn2(this);
>>>>>>> 574de0b291cadc2ddeddd07245a4f9f53129605c
  }
});
