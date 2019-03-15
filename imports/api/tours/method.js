import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
import { Tours, ToursSchema, toursToExcel } from './tours';
import { operator } from '../roles/roles';

Meteor.methods({
  addTours: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      ToursSchema.validate(doc);
      Tours.insert(doc);
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  editTours: function (doc) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      const data = doc.modifier.$set;
      const { _id } = doc;
      ToursSchema.validate(data);
      Tours.update({ _id }, {
        $set: data
      });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  removeTour: function (_id) {
    if (Roles.userIsInRole(Meteor.userId(), operator)) {
      Tours.remove({ _id });
    } else {
      throw new Meteor.Error('Permiso Denegado');
    }
  },
  reportTour: function (year) {
    const monthsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Tours.find().fetch().forEach(item => {
      const date = new Date(item.createAt);
      if (date.getFullYear() === year.year) {
        monthsCount[date.getMonth()] += 1;
      }
    });
    return monthsCount;
  },
  exportToursToExcel: function (query = {}) {
    // workbook
    const wb = XLSX.utils.book_new();
    const data = [];

    Tours.find(query).forEach(doc => {
      const toursRes = toursToExcel(doc._id, doc, false);
      data.push(...toursRes);
    });

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Tours');
    return wb;
  }
});
