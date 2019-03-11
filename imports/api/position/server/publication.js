import { Meteor } from 'meteor/meteor';
import { Position } from '../position';

Meteor.publish('position.all', () => Position.find());
