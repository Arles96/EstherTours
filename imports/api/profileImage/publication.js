import { Meteor } from 'meteor/meteor';
import ProfileImage from './profileImage';

Meteor.publish('imageProfile.all', () => ProfileImage.find().cursor);
