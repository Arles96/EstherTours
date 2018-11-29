import { Meteor } from 'meteor/meteor';
import { Guide, GuideSchema } from './guide';

Meteor.methods({
  insertGuide: function (doc) {
    GuideSchema.validate(doc);
    Guide.insert(doc);
  }
});
