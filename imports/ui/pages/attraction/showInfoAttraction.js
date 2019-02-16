import './showInfoAttraction.html';
import { Guide } from '../../../api/guide/guide';

Template.showInfoAttraction.helpers({
  guideInfo: guide => Guide.findOne({ _id: guide }).name,
  textCategorization: function (text) {
    Session.set('showAttractionRating', text);
    return 'Categorización';
  }
});
