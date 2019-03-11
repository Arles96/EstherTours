import { userActivities } from '../userActivities';

Meteor.publish('activities.all', () => userActivities.find());
Meteor.publish('activities.one', id => userActivities.find({ userId: id }));
