import { Template } from 'meteor/templating';
import Chart from 'chart.js';
import './reportTransportationEstablishment.html';

Template.reportTransportationEstablishments.onRendered(() => {
  const ctx = document.getElementById('myChart');
  /* eslint-disable */
  const myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
      datasets: [{
        label: '# of Votes',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)']
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
});

/*
const id = this._id;
    const TransportationEstablishment = TransportationEstablishments.findOne({ _id: id });
    Swal({
      title: 'Eliminar Registro de Transporte',
      text: `Esta seguro de eliminar este registro de ${TransportationEstablishment.name}`,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      focusCancel: true
    }).then(res => {
      if (res.value) {
        Meteor.call('deleteTransportationEstablishment', id, (error, result) => {
          if (error) {
            toastr.error('Error al eliminar el registro.');
          } else {
            toastr.success('Se ha eliminado el registro.');
          }
        });
      }
    });
 */