import { fromJS }               from 'immutable';
import { LOCATION_CHANGE }      from 'react-router-redux';
import * as AT                  from '../actionTypes';
import phonesReducer            from './phones';
import signinFormReducer        from './signinForm';

export const initialState = fromJS({
	bootstrap: true, // false - идёт загрузка и показывается прелоадер
	router: {},
	user: null,
	phones: {
		phoneExist: null,
		items: []
	},
	signinForm: {
		disabled: false,
		loading: false,
		fields: {
			login: {
				value: 'test@test.com',
				defaultValue: '',
				validateStatus: '',
				helperText: null
			},
			password: {
				value: 'test123',
				defaultValue: '',
				validateStatus: '',
				helperText: null
			},
			rememberMe: {
				checked: true
			},
			submitBtn: {
				disabled: false
			}
		}
	}
});

export default function (_state = new initialState(), action) {
	const {type, data, payload, ...rest} = action;

	let state = signinFormReducer(_state, action);
		state = phonesReducer(state, action);

	switch (type) {
		default:
			return state;

		case AT.BOOTSTRAP:
			return state.set('bootstrap', !!data);

		case LOCATION_CHANGE:
			return state.setIn(['router', 'location'], payload);

		case AT.AUTH_SUCCESS:
			return state.set('user', fromJS(payload))/*.set('bootstrap', false)*/;

		case AT.SIGNOUT_SUCCESS:
			return state.set('user', null);

		case AT.AUTH_ERROR:
			if (state.get('user')) return state.remove('user');
			return state;
	}
}
