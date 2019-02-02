import './showInfoAttraction.html';
import { Guide } from '../../../api/guide/guide';

Template.showInfoAttraction.helpers({
  selector: function () {
    return { idAttraction: Session.get('idAttraction') };
  },
  guideInfo: guide => Guide.findOne({ _id: guide }).name,
  urlTag: url => {
    if (!url) {
      return null;
    }
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }
    return `https://${url}`;
  },
  urlInfo: url => {
    if (!url) {
      return 'No tiene';
    }
    return url;
  }
});
