import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Renters } from '../../../api/renters/renters';
<<<<<<< HEAD
import { Hotels } from '../../../api/hotels/hotels';
=======
import { FleetRenter } from '../../../api/renters/fleetRenter';
>>>>>>> 617dd2f12e639fbf7d867f577fd88206413e401d

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

TabularTables.FleetRenter = new Tabular.Table({
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
    }
  ]
});

export default TabularTables;
