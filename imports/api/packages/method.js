import { Meteor } from 'meteor/meteor';
import { Packages, PackagesSchema } from './packages';
import PackagesSchemaConsult from './packageConsult';
import convertArrayOfObjectsToCSV from '../../startup/server/export';

Meteor.methods({
  insertPackages: function (doc) {
    PackagesSchema.validate(doc);
    Packages.insert(doc);
  },
  updatePackages: function (doc) {
    const data = doc.modifier.$set;
    const { _id } = doc;
    PackagesSchema.validate(data);
    Packages.update({ _id: _id }, {
      $set: data
    });
  },
  deletePackage: function (id) {
    Packages.remove({ _id: id });
  },
  findPackages: function (doc) {
    PackagesSchemaConsult.validate(doc);
    const query = JSON.parse(JSON.stringify(doc));
    if (query.name) {
      const regStr = query.name.split(/ /).join('|');
      const regex = new RegExp(regStr, 'i');
      query.name = { $regex: regex };
    }
    return { doc, query };
  },
  exportAllToCSV: function () {
    return convertArrayOfObjectsToCSV({ data: Packages.find().fetch() });
  }
});
