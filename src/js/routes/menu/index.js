import admin from './admin';
import _public from './public';

export default function getRoutesByRole() {
  // TODO: Implement route role filter
  return [...admin, ..._public];
}
