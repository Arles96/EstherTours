import { Meteor } from 'meteor/meteor';
import { branchOffices } from '../Offices';

Meteor.publish('branchOffice.one', id => branchOffices.find({ _id: id }));

Meteor.publish('branchOffices.all', () => branchOffices.find());
