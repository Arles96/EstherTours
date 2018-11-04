// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
// import Links from '../../api/links/links';

Meteor.startup(() => {
  // if the Links collection is empty
  /* if (Links.find().count() === 0) {
    const data = [
      {
        title: 'Do the Tutorial',
        url: 'https://www.meteor.com/try'
      },
      {
        title: 'Follow the Guide',
        url: 'http://guide.meteor.com'
      },
      {
        title: 'Read the Docs',
        url: 'https://docs.meteor.com'
      },
      {
        title: 'Discussions',
        url: 'https://forums.meteor.com'
      }
    ];

    data.forEach(link => Links.insert(link));
  } */
});
