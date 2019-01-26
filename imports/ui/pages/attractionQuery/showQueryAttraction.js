import './showQueryAttraction.html';
import { Session } from 'meteor/session';
import { Guide } from '../../../api/guide/guide';

Template.showQueryAttraction.onCreated(() => {
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

Template.showQueryAttraction.helpers({
  selector: function () {
    return Session.get('attractionQueryDoc').doc;
  },
  guideInfo: guide => Guide.findOne({ _id: guide }).name,
  urlTag: url => {
    if (!url) {
      return null;
    }
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  },
  urlInfo: url => {
    if (!url) {
      return 'No tiene';
    }
    return url;
  }
});

Template.showButtonQueryAttractions.events({
});
