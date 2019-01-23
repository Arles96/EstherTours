import { Meteor } from 'meteor/meteor';
import { Packages } from '../packages';

Meteor.publish('OnePackage', id => Packages.find({ _id: id }));
