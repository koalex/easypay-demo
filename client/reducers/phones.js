import { fromJS } from 'immutable';
import * as AT    from '../actionTypes';

export default function (state, action) {
	const { type, data, payload } = action;
	let nextState;

	switch (type) {
		default:
			return state;

		case AT.READ_PHONES:
			if (state.getIn(['phones', 'phoneExist']) != null) {
				return state.setIn(['phones', 'items'], null);
			} else {
				return state;
			}

		case AT.READ_PHONES_SUCCESS:
			return state.setIn(['phones', 'items'], fromJS(payload));

		case AT.CREATE_PHONE_SUCCESS:
			return state.setIn(['phones', 'phoneExist'], null);

		case AT.CREATE_PHONE_ERROR:
			if (payload && payload.field && payload.field == 'phone') {
				if (payload.message && 'уже занято' == payload.message) {
					return state.setIn(['phones', 'phoneExist'], true);
				} else {
					return state.setIn(['phones', 'phoneExist'], payload.message);
				}
			} else {
				alert('ОШИБКА');
			}

		case AT.CHECK_PHONE_SUCCESS:
			return state.setIn(['phones', 'phoneExist'], payload.exist);

		case AT.CHECK_PHONE_CLEAR:
			return state.setIn(['phones', 'phoneExist'], null);
	}
}
