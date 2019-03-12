import { Meteor } from 'meteor/meteor';
import { Tours } from '../tours';
import ToursImage from '../toursImage';

Meteor.publish('tours.all', () => Tours.find());

Meteor.publish('tours.one', _id => Tours.find({ _id }));

Meteor.publish('toursImage.all', () => ToursImage.find().cursor);
