import * as AT  from '../actionTypes';
import auth from '../actionCreators/auth'

export default store => {
	return next => {
		return action => {
			next(action);

			let { type, payload } = action;
			if (type === AT.AUTH && store.getState().get('bootstrap')) {
				store.dispatch({ type: AT.BOOTSTRAP, data: false });
			} else if ((type === AT.AUTH_SUCCESS || type === AT.AUTH_ERROR) && !store.getState().get('bootstrap')) {
				store.dispatch({ type: AT.BOOTSTRAP, data: true });
			} else if (type === AT.SIGNIN_SUCCESS) {
				window.localStorage.setItem('access_token', payload.access_token);
				store.dispatch(auth())
			} else if (type === AT.SIGNOUT_SUCCESS) {
				window.localStorage.removeItem('access_token');
			}
		}
	}
}
