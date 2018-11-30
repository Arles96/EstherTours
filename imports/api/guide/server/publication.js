import { Meteor } from 'meteor/meteor';
import { Guide } from '../guide';

Meteor.publish('guide.one', id => Guide.find({ _id: id }));
