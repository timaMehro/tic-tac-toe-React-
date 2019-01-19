import { gameConstants } from '../_constants';

export function gameRegistration(state = {}, action) {
  switch (action.type) {
    case gameConstants.REGISTER_REQUEST:
      return { registering: true };
    case gameConstants.REGISTER_SUCCESS:
      return {};
    case gameConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}