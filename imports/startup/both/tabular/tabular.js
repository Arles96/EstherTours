import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Renters } from '../../../api/renters/renters';
import { TransportationEstablishments } from '../../../api/TransportationEstablishment/TransportationEstablishment';
import { Hotels } from '../../../api/hotels/hotels';
import { Restaurants } from '../../../api/restaurants/restaurants';
import { restaurantOffers } from '../../../api/restaurants/restaurantOffers';
import { FleetRenter } from '../../../api/renters/fleetRenter';
import { FleetTransportationEstablishment } from '../../../api/TransportationEstablishment/FleetTransportationEstablishment';
import { RouteTransportationEstablishment } from '../../../api/TransportationEstablishment/RouteTransportationEstablishment';
import { RoomHotel } from '../../../api/hotels/roomhotel';
import { RateHotel } from '../../../api/hotels/ratehotel';
import { Guide } from '../../../api/guide/guide';
import { Packages } from '../../../api/packages/packages';

const TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Users = new Tabular.Table({
  name: 'Users',
  collection: Meteor.users,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  columns: [
    {
      class: 'text-center',
      data: 'profile.firstName',
      title: 'Primer Nombre'
    },
    {
      class: 'text-center',
      data: 'profile.lastName',
      title: 'Primer Apellido'
    },
    {
      class: 'text-center',
      data: 'emails[0].address',
      title: 'Correo'
    },
    {
      class: 'text-center',
      data: 'roles[0]',
      title: 'Rol'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function blockAndShowUsers (cell, cellData, rowData) {
        return Blaze.renderWithData(Template.showInfoUser, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

TabularTables.Renters = new Tabular.Table({
  name: 'Renters',
  collection: Renters,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  columns: [
    {
      class: 'text-center',
      data: 'name',
      title: 'Nombre'
    },
    {
      class: 'text-center',
      data: 'city',
      title: 'Ciudad'
    },
    {
      class: 'text-center',
      data: 'municipality',
      title: 'Municipio'
    },
    {
      class: 'text-center',
      data: 'department',
      title: 'Departamento'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function showButtonsRenters (cell, cellData, rowData) {
        return Blaze.renderWithData(Template.showButtonRenters, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

TabularTables.FleetsRenter = new Tabular.Table({
  name: 'FleetRenter',
  collection: FleetRenter,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  extraFields: ['menage', 'idRenter'],
  columns: [
    {
      class: 'text-center',
      data: 'total',
      title: 'Total'
    },
    {
      class: 'text-center',
      data: 'type',
      title: 'Tipo'
    },
    {
      class: 'text-center',
      data: 'rate',
      title: 'Tarifa'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function showButtonsFleetRenters (cell, cellData, rowData) {
        return Blaze.renderWithData(Template.showButtonFleetRenters, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

TabularTables.Restaurants = new Tabular.Table({
  name: 'Restaurants',
  collection: Restaurants,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  columns: [
    {
      class: 'text-center',
      data: 'name',
      title: 'Nombre'
    },
    {
      class: 'text-center',
      data: 'city',
      title: 'Ciudad'
    },
    {
      class: 'text-center',
      data: 'municipality',
      title: 'Municipio'
    },
    {
      class: 'text-center',
      data: 'department',
      title: 'Departamento'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function showButtonsRestaurant (cell, cellData, rowData) {
        return Blaze.renderWithData(Template.showButtonRestaurant, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

TabularTables.restaurantOffers = new Tabular.Table({
  name: 'restaurantOffers',
  collection: restaurantOffers,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  extraFields: ['idRestaurant'],
  columns: [
    {
      class: 'text-center',
      data: 'typeFood',
      title: 'Tipo de Comida'
    },
    {
      class: 'text-center',
      data: 'dishName',
      title: 'Nombre del Plato'
    },
    {
      class: 'text-center',
      data: 'price',
      title: 'Precio'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function showButtonRestaurantOffers (cell, cellData, rowData)
      // eslint-disable-next-line brace-style
      {
        return Blaze.renderWithData(Template.showButtonRestaurantOffers, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

TabularTables.Hotels = new Tabular.Table({
  name: 'Hotels',
  collection: Hotels,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  columns: [
    {
      class: 'text-center',
      data: 'name',
      title: 'Nombre'
    },
    {
      class: 'text-center',
      data: 'street',
      title: 'Calle'
    },
    {
      class: 'text-center',
      data: 'city',
      title: 'Ciudad'
    },
    {
      class: 'text-center',
      data: 'municipality',
      title: 'Municipio'
    },
    {
      class: 'text-center',
      data: 'departament',
      title: 'Departamento'
    },
    {
      class: 'text-center',
      data: 'phone',
      title: 'Teléfono'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function showButtonsHotels (cell, cellData, rowData) {
        return Blaze.renderWithData(Template.showButtonHotels, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

TabularTables.RoomHotel = new Tabular.Table({
  name: 'RoomHotel',
  collection: RoomHotel,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  extraFields: ['menage', 'idHotel'],
  columns: [
    {
      class: 'text-center',
      data: 'price',
      title: 'Precio'
    },
    {
      class: 'text-center',
      data: 'type',
      title: 'Tipo'
    },
    {
      class: 'text-center',
      data: 'extraBed',
      title: 'Cantidad de camas extra'
    },
    {
      class: 'text-center',
      data: 'roomSize',
      title: 'Tamaño de la habitación'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function showButtonRoomHotel (cell, cellData, rowData) {
        return Blaze.renderWithData(Template.showButtonRoomHotel, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

TabularTables.RateHotel = new Tabular.Table({
  name: 'RateHotel',
  collection: RateHotel,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  extraFields: ['idHotel'],
  columns: [
    {
      class: 'text-center',
      data: 'price',
      title: 'Precio'
    },
    {
      class: 'text-center',
      data: 'type',
      title: 'Tipo'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function showButtonRateHotel (cell, cellData, rowData) {
        return Blaze.renderWithData(Template.showButtonRateHotel, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

TabularTables.TransportationEstablishments = new Tabular.Table({
  name: 'TransportationEstablishments',
  collection: TransportationEstablishments,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  columns: [
    {
      class: 'text-center',
      data: 'name',
      title: 'Nombre'
    },
    {
      class: 'text-center',
      data: 'email',
      title: 'Correo electrónico'
    },
    {
      class: 'text-center',
      data: 'phone',
      title: 'Teléfono'
    },
    {
      class: 'text-center',
      data: 'department',
      title: 'Departamento'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function showButtonsTransportationEstablishments
      (cell, cellData, rowData) {
        return Blaze.renderWithData(Template.showButtonTransportationEstablishments, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

TabularTables.FleetTransportationEstablishment = new Tabular.Table({
  name: 'FleetTransportationEstablishment',
  collection: FleetTransportationEstablishment,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  extraFields: ['idTransportationEstablishment'],
  columns: [
    {
      class: 'text-center',
      data: 'type',
      title: 'Tipo'
    },
    {
      class: 'text-center',
      data: 'rate',
      title: 'Tarifa'
    },
    {
      class: 'text-center',
      data: 'capacity',
      title: 'Capacidad'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function showButtonFleetTransportationEstablishments
      (cell, cellData, rowData) {
        return Blaze.renderWithData(Template.showButtonFleetTransportationEstablishments, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

TabularTables.RouteTransportationEstablishment = new Tabular.Table({
  name: 'RouteTransportationEstablishment',
  collection: RouteTransportationEstablishment,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  extraFields: ['idTransportationEstablishment', 'description'],
  columns: [
    {
      class: 'text-center',
      data: 'type',
      title: 'Tipo'
    },
    {
      class: 'text-center',
      data: 'department',
      title: 'Departamento'
    },
    {
      class: 'text-center',
      data: 'town',
      title: 'Municipio'
    },
    {
      class: 'text-center',
      data: 'city',
      title: 'Ciudad'
    },
    {
      class: 'text-center',
      data: 'street',
      title: 'Calle'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function showButtonRouteTransportationEstablishments
      (cell, cellData, rowData) {
        return Blaze.renderWithData(Template.showButtonRouteTransportationEstablishments, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

TabularTables.Guides = new Tabular.Table({
  name: 'Guides',
  collection: Guide,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  extraFields: [
    'email', 'street', 'telephone',
    'license', 'categorization', 'services',
    'paymentMethods', 'money', 'languages', 'creditCards'
  ],
  columns: [
    {
      class: 'text-center',
      data: 'name',
      title: 'Nombre'
    },
    {
      class: 'text-center',
      data: 'destination',
      title: 'Destino'
    },
    {
      class: 'text-center',
      data: 'city',
      title: 'Ciudad'
    },
    {
      class: 'text-center',
      data: 'municipality',
      title: 'Municipio'
    },
    {
      class: 'text-center',
      data: 'department',
      title: 'Departamento'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function showButtonsGuide (cell, cellData, rowData) {
        return Blaze.renderWithData(Template.showButtonsGuide, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

TabularTables.Packages = new Tabular.Table({
  name: 'Packages',
  collection: Packages,
  responsive: true,
  autoWidth: false,
  search: {
    caseInsesitive: true,
    smart: true,
    onEnterOnly: false
  },
  /* extraFields: [
    'email', 'street', 'telephone',
    'license', 'categorization', 'services',
    'paymentMethods', 'money', 'languages', 'creditCards'
  ], */
  columns: [
    {
      class: 'text-center',
      data: 'name',
      title: 'Nombre'
    },
    {
      class: 'text-center',
      data: 'price',
      title: 'Precio'
    },
    {
      class: 'text-center',
      createdCell: Meteor.isClient && function showButtonsGuide (cell, cellData, rowData) {
        return Blaze.renderWithData(Template.showButtonPackages, {
          _id: rowData._id,
          slug: rowData.slug
        }, cell);
      }
    }
  ]
});

export default TabularTables;
