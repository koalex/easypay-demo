import * as AT      from '../actionTypes';
import {readPhones} from '../actionCreators/phones'

export default store => {
	return next => {
		return action => {
			next(action);

			let { type } = action;
			if (type === AT.DELETE_PHONE_SUCCESS) {
				store.dispatch(readPhones());
			} else if (type === AT.CREATE_PHONE_SUCCESS) {
				store.dispatch(readPhones());
			}
		}
	}
}
