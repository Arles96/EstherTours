// Definition of the links collection

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Links = new Mongo.Collection('links');
const LinkSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
    max: 200
  },
  url: {
    type: String,
    label: 'Url',
    max: 200
  },
  createdAt: {
    type: Date,
    label: 'Created At',
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }

      return { $unset: '' };
    }
  }
});
Links.attachSchema(LinkSchema);

export default Links;
