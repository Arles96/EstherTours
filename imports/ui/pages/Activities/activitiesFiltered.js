import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import Chart from 'chart.js';
import toastr from 'toastr';

import './activitiesFiltered.html';

Template.userActivitiesFiltered.onCreated(function createVar () {
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
  this.myChart = new ReactiveVar(null);
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
    Session.set('selectedUserActivitiesName', event.currentTarget.label);
    Template.instance().myChart.get().destroy();
    drawChart(Template.instance());
  }
});

Template.userActivitiesFiltered.onRendered(() => {
  drawChart(Template.instance());
});

function drawChart (templateInstance) {
  const ctx = document.getElementById('userActivitiesChart');
  const selUser = Session.get('selectedUserActivities');
  const selUserName = Session.get('selectedUserActivitiesName');
  if (!selUser) {
    return;
  }
  Meteor.call('activitiesCount', selUser, (error, result) => {
    if (error) {
      toastr.error('Error al procesar el reporte de actividades.');
    } else {
      templateInstance.myChart.set(new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Agregados', 'Editados', 'Eliminados'],
          datasets: [{
            label: `Registro de actividades del usuario ${selUserName}`,
            data: result,
            backgroundColor: [
              '#34495E',
              '#98A4A4',
              '#5CACE1'
            ]
          }]
        }
      }));
    }
  });
}
