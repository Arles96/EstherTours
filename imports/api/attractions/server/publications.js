import { Meteor } from 'meteor/meteor';
import { Attractions } from '../attractions';
import AttractionImages from '../attractionImage';

Meteor.publish('attraction.one', id => Attractions.find({ _id: id }));

Meteor.publish('attractions.all', () => Attractions.find());

Meteor.publish('attractionImage.all', () => AttractionImages.find().cursor);
