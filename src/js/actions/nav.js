import {NAV_ACTIVATE, NAV_ENABLE, NAV_LOAD_ITEMS, NAV_RESPONSIVE} from '../actions';

export function navActivate(active) {
  return {type: NAV_ACTIVATE, active};
}

export function navEnable(enabled) {
  return {type: NAV_ENABLE, enabled};
}

export function navLoadItems(items) {
  return {type: NAV_LOAD_ITEMS, items};
}

export function navResponsive(responsive) {
  return {type: NAV_RESPONSIVE, responsive};
}
