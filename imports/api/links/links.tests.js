/* import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import Links from './links';

if (Meteor.isServer) {
  describe('links collection', () => {
    it('insert correctly', () => {
      const linkId = Links.insert({
        title: 'meteor homepage',
        url: 'https://www.meteor.com'
      });
      const added = Links.find({ _id: linkId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'links');
      assert.equal(count, 1);
    });
  });
} */
