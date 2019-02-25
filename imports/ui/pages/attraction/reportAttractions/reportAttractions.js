import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Chart from 'chart.js';
import toastr from 'toastr';
import './reportAttractions.html';

Template.reportAttractions.onCreated(function createVars () {
  const date = new Date();
  this.maxYear = new ReactiveVar(date.getFullYear());
  this.currentYear = new ReactiveVar(date.getFullYear());
  this.myChart = new ReactiveVar(null);
});

Template.reportAttractions.helpers({
  currentYear () {
    return Template.instance().currentYear.get();
  },
  maxYear () {
    return Template.instance().maxYear.get();
  }
});

Template.reportAttractions.events({
  'input #rangeControl' (event, templateInstance) {
    templateInstance.currentYear.set(event.currentTarget.value);
    Template.instance().myChart.get().destroy();
    draw(event.currentTarget.value, Template.instance());
  }
});

Template.reportAttractions.onRendered(() => {
  const date = new Date();
  draw(date.getFullYear(), Template.instance());
});

function draw (selectedYear, templateInstance) {
  const ctx = document.getElementById('reportChart');
  Meteor.call('reportAttractions', { year: Number(selectedYear) }, (error, result) => {
    if (error) {
      toastr.error('Error al procesar el reporte.');
    } else {
      templateInstance.myChart.set(new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: [{
            label: `Creación de atracciones del ${this.currentYear}`,
            data: result,
            backgroundColor: [
              '#34495E',
              '#98A4A4',
              '#5CACE1',
              '#47C9AF',
              '#16A086',
              '#AE7AC4',
              '#8D44AD',
              '#F1C40F',
              '#F39C11',
              '#D25400',
              '#E84C3D',
              '#C1372A'
            ]
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
      }));
    }
  });
}
