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
import { Attractions } from '../../api/attractions/attractions';

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
import '../../ui/pages/restaurants/showInfoRestaurant';
import '../../ui/pages/restaurantConsults/consultRestaurant';
import '../../ui/pages/restaurantConsults/listRestaurantResults';
import '../../ui/pages/updateProfile/updateProfile';
import '../../ui/pages/changePassword/changePassword';
import '../../ui/pages/renters/addRenters';
import '../../ui/pages/renters/listRenters';
import '../../ui/pages/renters/branchRenter';
import '../../ui/pages/TransportationEstablishment/addTransportationEstablishments';
import '../../ui/pages/TransportationEstablishment/listTransportationEstablishments';
import '../../ui/pages/TransportationEstablishment/showInfoTransportationEstablishment';
import '../../ui/pages/TransportationEstablishment/editTransportationEstablishment';
import '../../ui/pages/hotel/addHotels';
import '../../ui/pages/hotel/listHotels';
import '../../ui/pages/hotelQuery/hotelQuery';
import '../../ui/pages/hotelQuery/showQueryHotel';
import '../../ui/pages/renters/editRenter';
import '../../ui/pages/renters/showInfoRenter';
import '../../ui/pages/hotel/showInfoHotel';
import '../../ui/pages/hotel/editHotel';
import '../../ui/pages/attraction/filterAttractions';
import '../../ui/pages/attraction/addAttractions';
import '../../ui/pages/attraction/listAttractions';
import '../../ui/pages/attraction/editAttractions';
import '../../ui/pages/attractionQuery/attractionQuery';
import '../../ui/pages/attractionQuery/showQueryAttraction';
import '../../ui/pages/attraction/showInfoAttraction';
import '../../ui/pages/guide/addGuide';
import '../../ui/pages/guide/listGuide';
import '../../ui/pages/guide/editGuide';
import '../../ui/pages/findGuide/findGuide';
import '../../ui/pages/resultGuide/resultGuide';
import '../../ui/pages/packages/addPackages';
import '../../ui/pages/packages/listPackages';
import '../../ui/pages/packages/editPackages';
import '../../ui/pages/packages/showPackage';
import '../../ui/pages/findPackage/findPackage';
import '../../ui/pages/resultPackages/resultPackages';
import '../../ui/pages/RenterQuary/findRenters';
import '../../ui/pages/RenterQuary/showRenters';
import '../../ui/pages/findTransport/findTransport';
import '../../ui/pages/resultTransport/resultTransport';
import '../../ui/pages/branchOfficePage/officesPage';
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
  waiton: function () {
    return Meteor.subscribe('branchOffices.all');
  },
  onBeforeAction: function () {
    listBreadcrumb(['Usuarios']);
    isAdmin(this);
  }
});

/**
 * Rutas para sucursales
 */
Router.route('/offices', {
  name: 'offices',
  template: 'officePage',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Sucursales']);
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
  },
  waitOn: function () {
    return [
      Meteor.subscribe('imageProfile.all')
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
  waitOn: function () {
    return [
      Meteor.subscribe('restaurantImage.all'),
      Meteor.subscribe('restaurant.all')
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Agregar Restaurante']);
    Session.set('rating', undefined);
    isOperator(this);
  }
});

Router.route('/consult-restaurant', {
  name: 'consult-restaurant',
  template: 'consultRestaurant',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
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
      Meteor.subscribe('restaurant.one')
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Tabla de Restaurantes']);
    isOperator(this);
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
      Meteor.subscribe('restaurant.one', id),
      Meteor.subscribe('restaurant.all', id),
      Meteor.subscribe('restaurantImage.all')
    ];
  },
  onBeforeAction: function () {
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
      Meteor.subscribe('restaurantImage.all')
    ];
  },
  onBeforeAction: function () {
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
      Meteor.subscribe('restaurant.one', id)
    ];
  },
  onBeforeAction: function () {
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
  onBeforeAction: function () {
    listBreadcrumb(['Formulario Consulta Restaurante', 'Resultado Consulta Restaurante']);
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
    return Meteor.subscribe('renter.all');
  },
  onBeforeAction: function () {
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
      Meteor.subscribe('renter.one')
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Tabla de Arrendadoras']);
    isOperator(this);
  }
});

/**
 * Ruta para consulta de Arrendadoras
 */
Router.route('/find-renters', {
  name: 'findRenters',
  template: 'findRenters',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
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
  onBeforeAction: function () {
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
  onBeforeAction: function () {
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
    return Meteor.subscribe('TransportationEstablishment.one', id);
  },
  onBeforeAction: function () {
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

/*
 * Ruta para agregar hoteles
 */
Router.route('/add-hotels', {
  name: 'addHotels',
  template: 'addHotels',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Agregar hoteles']);
    Session.set('hotelCategorization', undefined);
    isOperator(this);
  },
  waitOn: function () {
    return [
      Meteor.subscribe('hotelImage.all')
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
      Meteor.subscribe('renter.all', id)
    ];
  },
  onBeforeAction: function () {
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
      Meteor.subscribe('renter.one', id)
    ];
  },
  onBeforeAction: function () {
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
    return [
      Meteor.subscribe('renter.one', id),
      Meteor.subscribe('renter.all', id),
      Meteor.subscribe('FleetRenterImage.all')
    ];
  },
  onBeforeAction: function () {
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
      Meteor.subscribe('hotelImage.all')
    ];
  },
  onBeforeAction: function () {
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
  onBeforeAction: function () {
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
      Meteor.subscribe('hotelImage.all')
    ];
  },
  onBeforeAction: function () {
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

Router.route('/hotel-query', {
  name: 'hotelQuery',
  template: 'hotelQuery',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Consulta de hoteles']);
    Session.set('hotelQCategorization', undefined);
    isConsultant(this);
  }
});

Router.route('/show-query-hotel', {
  name: 'showQueryHotel',
  template: 'showQueryHotel',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
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
      Meteor.subscribe('attractions.all'),
      Meteor.subscribe('attraction.one'),
      Meteor.subscribe('attractionImage.all')
    ];
  },
  onBeforeAction: function () {
    listBreadcrumb(['Filtrar atracciones']);
    isOperator(this);
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
    listBreadcrumb(['Agregar atracciones']);
    Session.set('attractionCategorization', undefined);
    isOperator(this);
  },
  waitOn: function () {
    return [
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
  onBeforeAction: function () {
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
      Meteor.subscribe('attractionImage.all')
    ];
  },
  onBeforeAction: function () {
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
      Meteor.subscribe('guide.all'),
      Meteor.subscribe('attractionImage.all')
    ];
  },
  onBeforeAction: function () {
    const { id } = this.params;
    const attraction = Attractions.findOne({ _id: id });
    Session.set('idAttraction', id);
    Session.set('showAttractionRating', undefined);
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
    listBreadcrumb(['Consulta de Atracciones']);
    Session.set('attractionQCategorization', undefined);
    isConsultant(this);
  },
  waitOn: function () {
    return [Meteor.subscribe('guide.all')];
  }
});

Router.route('/show-query-attraction', {
  name: 'showQueryAttraction',
  template: 'showQueryAttraction',
  layoutTemplate: 'bodyAdmin',
  onBeforeAction: function () {
    listBreadcrumb(['Consulta de atracciones']);
    isConsultant(this);
  },
  data: function () {
    return {
      attraction: Session.get('attractionQueryDoc').docVals
    };
  },
  waitOn: function () {
    return [Meteor.subscribe('guide.all')];
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
    listBreadcrumb(['Formulario Consulta Guía']);
    Session.set('findGuideCategorization', undefined);
    isLoggedIn2(this);
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
    listBreadcrumb(['Formulario Consulta Guía', 'Resultado Consulta Guía']);
    isConsultant(this);
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
    Session.set('findTransportCategorization', undefined);
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
    Session.set('listPackages', undefined);
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
