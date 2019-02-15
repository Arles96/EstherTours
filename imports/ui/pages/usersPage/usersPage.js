import './usersPage.html';
import './addUserModal';
import './showInfoUser';
import './officeEdit';
import { Meteor } from 'meteor/meteor';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import { Session } from 'meteor/session';

Template.usersPage.onCreated(() => {
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

/**
 * helpers y eventos para la template de showUnfoUser
 */
Template.showInfoUser.helpers({
  isBlocked: function (_id) {
    return Meteor.users.findOne({ _id: _id }).profile.blocked;
  }
});

Template.showInfoUser.events({
  'click .showInfo': function () {
    Session.set('idUserInfo', this._id);
  },
  'click .editInfo': function () {
    Session.set('officeUser', {
      idOffice: Meteor.users.findOne({ _id: this._id }).profile.idOffice,
      idUser: this._id
    });
  },
  'click .lock': function () {
    const id = this._id;
    Swal({
      title: 'Bloquear Usuario',
      text: 'Esta seguro de bloquear este usuario',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('actionBlockedUser', { _id: id, blocked: true }, (error, result) => {
          if (error) {
            toastr.error('Error al bloquear al usuario.');
          } else {
            toastr.success('Se ha bloqueado al usuario exitosamente.');
          }
        });
      }
    });
  },
  'click .unlock': function () {
    const id = this._id;
    Swal({
      title: 'Desbloquear Usuario',
      text: 'Esta seguro de desbloquear este usuario',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('actionBlockedUser', { _id: id, blocked: false }, (error, result) => {
          if (error) {
            toastr.error('Error al desbloquear al usuario.');
          } else {
            toastr.success('Se ha desbloqueado al usuario exitosamente.');
          }
        });
      }
    });
  }
});
