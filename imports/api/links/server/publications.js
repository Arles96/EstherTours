// All links-related publications

import { Meteor } from 'meteor/meteor';
import Links from '../links';

Meteor.publish('links.all', () => (
  Links.find()
));
