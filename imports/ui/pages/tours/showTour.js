import './showTour.html';
import '../../components/showRating/showRating';
import { Guide } from '../../../api/guide/guide';

Template.showTour.helpers({
  guideInfo: guide => Guide.findOne({ _id: guide }).name
});
