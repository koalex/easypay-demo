import * as AT from '../actionTypes';

export function createPhone (phone) {
	return {
		type: AT.CREATE_PHONE,
		CALL_API: {
			endpoint: '/api/v1/phones',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: {
				phone
			},
			success_type: AT.CREATE_PHONE_SUCCESS,
			error_type: AT.CREATE_PHONE_ERROR
		}
	}
}

export function readPhones () {
	return {
		type: AT.READ_PHONES,
		CALL_API: {
			endpoint: '/api/v1/phones',
			method: 'GET',
			headers: {
				'Cache-Control': 'no-cache',
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			success_type: AT.READ_PHONES_SUCCESS,
			error_type: AT.READ_PHONES_ERROR
		}
	}
}

export function deletePhone (phone) {
	return {
		type: AT.DELETE_PHONE,
		CALL_API: {
			endpoint: '/api/v1/phones/' + phone,
			method: 'DELETE',
			headers: {
				'Accept': 'application/json'
			},
			success_type: AT.DELETE_PHONE_SUCCESS,
			error_type: AT.DELETE_PHONE_ERROR
		}
	}
}

export function checkPhone (phone) {
	return {
		type: AT.CHECK_PHONE,
		CALL_API: {
			endpoint: '/api/v1/phones/' + phone + '/check',
			method: 'GET',
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				'Accept': 'application/json'
			},
			success_type: AT.CHECK_PHONE_SUCCESS,
			error_type: AT.CHECK_PHONE_ERROR
		}
	}
}

export function checkPhoneClear () {
	return {
		type: AT.CHECK_PHONE_CLEAR
	}
}
