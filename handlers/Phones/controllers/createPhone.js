'use strict';

const Phone = require('../models/phone');

module.exports = async ctx => {

	let phoneCandidate = ctx.request.body;

	if (!phoneCandidate || !phoneCandidate.phone) {
		return ctx.throw(400, { message: {
			field: 'phone',
			message: 'отсутствует телефон'
		} });
	}

	let phone = new Phone(phoneCandidate);
		// phone.created_by = ctx.state.user._id;

	await phone.save();

	ctx.status = 201;
};