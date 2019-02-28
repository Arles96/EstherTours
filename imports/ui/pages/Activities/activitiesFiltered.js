import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './activitiesFiltered.html';

Template.userActivitiesFiltered.onCreated(() => {
  $.extend(true, $.fn.dataTable.defaults, {
    language: {
      sLengthMenu: 'Mostrar _MENU_ registros',
      sProcessing: 'Procesando ...',
      sZeroRecords: 'No se encontraron resultados',
      sEmptyTable: 'Nigún dato disponible ',
      sInfo: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
      sInfoPostFix: ' ',
      sSearch: 'Buscar:',
      sUrl: '',
      sInfoThousands: ',',
      sLoadingRecords: 'Cargando...',
      oPaginate: {
        sFirst: 'Primero',
        sLast: 'Último',
        sNext: 'Siguiente',
        sPrevious: 'Anterior'
      },
      oAria: {
        sSortAscending: ': Activar para ordenar la columna de manera ascendente',
        sSortDescending: ': Activar para ordenar la columna de manera descendente'
      }
    }
  });
});

Template.userActivitiesFiltered.helpers({
  Users: () => (Meteor.users.find({}).map(doc => ({
    label: `${doc.profile.firstName} ${doc.profile.lastName}, ${doc.roles[0]}`,
    value: doc._id
  }))),
  selector: () => ({
    userId: Session.get('selectedUserActivities')
  })
});

Template.userActivitiesFiltered.events({
  'change #userSelector' (event) {
    Session.set('selectedUserActivities', event.currentTarget.value);
  }
});
