import * as AT from '../actionTypes';

export default function () {
	return {
		type: AT.SIGNOUT,
		CALL_API: {
			endpoint: '/api/v1/signout',
			method: 'POST',
			success_type: AT.SIGNOUT_SUCCESS,
			error_type: AT.SIGNOUT_ERROR
		}
	}
}