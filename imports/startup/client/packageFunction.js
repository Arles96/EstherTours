import { Session } from 'meteor/session';

export const setValues = () => {
  Session.set('isCreatePackage', localStorage.getItem('createPackage'));
  Session.set('packageAttraction', localStorage.getItem('packageAttraction'));
  Session.set('packageRoomHotel', localStorage.getItem('packageRoomHotel'));
  Session.set('packageHotel', localStorage.getItem('packageHotel'));
  Session.set('packageFleetRenter', localStorage.getItem('packageFleetRenter'));
  Session.set('packageRenter', localStorage.getItem('packageRenter'));
  Session.set('packageRestaurant', localStorage.getItem('packageRestaurant'));
  Session.set('packageRouteTransport', localStorage.getItem('packageRouteTransport'));
  Session.set('packageTransport', localStorage.getItem('packageTransport'));
};

export const clearValues = () => {
  Session.set('isCreatePackage', undefined);
  Session.set('packageAttraction', undefined);
  Session.set('packageRoomHotel', undefined);
  Session.set('packageHotel', undefined);
  Session.set('packageFleetRenter', undefined);
  Session.set('packageRenter', undefined);
  Session.set('packageRestaurant', undefined);
  Session.set('packageRouteTransport', undefined);
  Session.set('packageTransport', undefined);
  localStorage.setItem('createPackage', undefined);
  localStorage.setItem('packageAttraction', undefined);
  localStorage.setItem('packageRoomHotel', undefined);
  localStorage.setItem('packageHotel', undefined);
  localStorage.setItem('packageFleetRenter', undefined);
  localStorage.setItem('packageRenter', undefined);
  localStorage.setItem('packageRestaurant', undefined);
  localStorage.setItem('packageRouteTransport', undefined);
  localStorage.setItem('packageTransport', undefined);
};

export const packageAttraction = id => {
  localStorage.setItem('packageAttraction', id);
  Session.set('packageAttraction', id);
};

export const unpackageAttraction = () => {
  localStorage.setItem('packageAttraction', undefined);
  Session.set('packageAttraction', undefined);
};

export const packageHotel = (idHotel, idRoom) => {
  localStorage.setItem('packageRoomHotel', idRoom);
  localStorage.setItem('packageHotel', idHotel);
  Session.set('packageRoomHotel', idRoom);
  Session.set('packageHotel', idHotel);
};

export const unpackageHotel = () => {
  localStorage.setItem('packageRoomHotel', undefined);
  localStorage.setItem('packageHotel', undefined);
  Session.set('packageRoomHotel', undefined);
  Session.set('packageHotel', undefined);
};

export const packageRenter = (idRenter, idFleet) => {
  localStorage.setItem('packageFleetRenter', idFleet);
  localStorage.setItem('packageRenter', idRenter);
  Session.set('packageFleetRenter', idFleet);
  Session.set('packageRenter', idRenter);
};

export const unpackageRenter = () => {
  localStorage.setItem('packageFleetRenter', undefined);
  localStorage.setItem('packageRenter', undefined);
  Session.set('packageFleetRenter', undefined);
  Session.set('packageRenter', undefined);
};

export const packageRestaurant = _id => {
  localStorage.setItem('packageRestaurant', _id);
  Session.set('packageRestaurant', _id);
};

export const unpackageRestaurant = () => {
  localStorage.setItem('packageRestaurant', undefined);
  Session.set('packageRestaurant', undefined);
};

export const packageTransport = (idTransport, idRoute) => {
  localStorage.setItem('packageRouteTransport', idRoute);
  localStorage.setItem('packageTransport', idTransport);
  Session.set('packageRouteTransport', idRoute);
  Session.set('packageTransport', idTransport);
};

export const unpackageTransport = () => {
  localStorage.setItem('packageRouteTransport', undefined);
  localStorage.setItem('packageTransport', undefined);
  Session.set('packageRouteTransport', undefined);
  Session.set('packageTransport', undefined);
};
