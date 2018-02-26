import { fromJS } from 'immutable';
import * as AT    from '../actionTypes';

export default function (state, action) {
	const { type, data } = action;
	let nextState;

	switch (type) {
		default:
			return state;

		case AT.SIGNIN:
			return clearErrorsAndHelperText(state).setIn(['signinForm', 'disabled'], true).setIn(['signinForm', 'loading'], true);

		case AT.SIGNIN_SUCCESS:
			return state.setIn(['signinForm', 'disabled'], false).setIn(['signinForm', 'fields'], fromJS({
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
			})).setIn(['signinForm', 'loading'], false);

		case AT.SIGNIN_ERROR:
			nextState = state.setIn(['signinForm', 'disabled'], false).setIn(['signinForm', 'loading'], false);
			return handleServerError(nextState, action.payload);

		case AT.SIGNIN_FORM_CHANGE:
			nextState = state;

			if (fieldHasErrorOrHelperText(state, data.name)) {
				nextState = clearFieldErrorAndHelperText(nextState, data.name);
			}

			nextState = nextState.setIn(['signinForm', 'fields', data.name, 'value'], data.value);

			let login = nextState.getIn(['signinForm', 'fields', 'login', 'value']),
				password = nextState.getIn(['signinForm', 'fields', 'password', 'value']),
				submitBtnIsDisabled = nextState.getIn(['signinForm', 'fields', 'submitBtn', 'disabled']);

			if (login.trim() && password.trim() && submitBtnIsDisabled) {
				nextState = nextState.setIn(['signinForm', 'fields', 'submitBtn', 'disabled'], false);
			} else if ((!login.trim() || !password.trim()) && !submitBtnIsDisabled) {
				nextState = nextState.setIn(['signinForm', 'fields', 'submitBtn', 'disabled'], true);
			}

			return nextState
	}
}

function fieldHasErrorOrHelperText (state, fieldName) {
	return (!!(state.getIn(['signinForm', 'fields', fieldName, 'validateStatus']) || state.getIn(['signinForm', 'fields', fieldName, 'helperText'])));
}

function clearFieldErrorAndHelperText (state, fieldName) {
	let fieldErr = (state.getIn(['signinForm', 'fields', fieldName, 'validateStatus']) || state.getIn(['signinForm', 'fields', fieldName, 'helperText']));

	if (!fieldErr) return state;

	return state.setIn(['signinForm', 'fields', fieldName, 'validateStatus'], '')
		.setIn(['signinForm', 'fields', fieldName, 'helperText'], '');
}

function clearErrorsAndHelperText (state) {
	let loginErr = (state.getIn(['signinForm', 'fields', 'login', 'validateStatus']) || state.getIn(['signinForm', 'fields', 'login', 'helperText'])),
		passwordErr = (state.getIn(['signinForm', 'fields', 'password', 'validateStatus']) || state.getIn(['signinForm', 'fields', 'password', 'helperText']));

	if (!loginErr && !passwordErr) return state;

	let nextState = state;

	if (loginErr) {
		nextState = nextState.setIn(['signinForm', 'fields', 'login', 'validateStatus'], '')
			.setIn(['signinForm', 'fields', 'login', 'helperText'], '')
	}
	if (passwordErr) {
		nextState = nextState.setIn(['signinForm', 'fields', 'password', 'validateStatus'], '')
			.setIn(['signinForm', 'fields', 'password', 'helperText'], '')
	}

	return nextState;
}

function handleServerError (state, payload) {
	let nextState = state;

	if (Array.isArray(payload)) {
		payload.forEach(err => {
			if (err.field && err.message) {
				return nextState = nextState.setIn(['signinForm', 'fields', err.field, 'validateStatus'], 'error')
					.setIn(['signinForm', 'fields', err.field, 'helperText'], err.message)
			}
		});
	} else if (payload && ('object' == typeof payload)) {
		if (payload.field && payload.message) {
			return nextState = nextState.setIn(['signinForm', 'fields', payload.field, 'validateStatus'], 'error')
				.setIn(['signupForm', 'fields', payload.field, 'helperText'], payload.message);
		}
	}

	return nextState;
}
