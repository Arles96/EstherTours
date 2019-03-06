import './listSubscriptions.html';
import '../../components/editSubscription/editSubscription';
import toastr from 'toastr';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { Subscriptions } from '../../../api/subscriptions/subscriptions';

Template.listSubscriptions.onCreated(() => {
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

Template.showButtonSubscriptions.events({
  'click .subUnsub': function () {
    const id = this._id;
    const sub = Subscriptions.findOne({ _id: id });
    Meteor.call('unsubscribe', id, (error, result) => {
      if (error) {
        toastr.error('Error al realizar el cambio de suscripción.');
      } else {
        toastr.success(`Se ha quitado la suscripción al correo ${sub.email}.`);
      }
    });
  },
  'click .subSub': function () {
    const id = this._id;
    const sub = Subscriptions.findOne({ _id: id });
    Meteor.call('subscribe', id, (error, result) => {
      if (error) {
        toastr.error('Error al realizar el cambio de suscripción.');
      } else {
        toastr.success(`Se ha suscrito al correo ${sub.email}.`);
      }
    });
  },
  'click .subEdit': function () {
    const id = this._id;
    const sub = Subscriptions.findOne({ _id: id });
    Session.set('subscriptionEdit', sub);
  },
  'click .subDelete': function () {
    const id = this._id;
    const sub = Subscriptions.findOne({ _id: id });
    Swal({
      title: 'Eliminar Suscripción',
      text: `Esta seguro de eliminar la suscripción de ${sub.name} (${sub.email})?`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteSubscription', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se ha eliminado el registro.');
          }
        });
      }
    });
  }
});
