import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

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

export default TabularTables;
