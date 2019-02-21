import './shoppingPackage.html';
import '../../components/cardFleetRenter/cardFleetRenter';
import '../../components/cardRestaurant/cardRestaurant';
import '../../components/cardRoomHotel/cardRoomHotel';
import '../../components/cardRouteTransport/cardRouteTransport';
import { PackagesSchema } from '../../../api/packages/packages';

Template.shoppingPackage.helpers({
  PackagesSchema: () => PackagesSchema
});
