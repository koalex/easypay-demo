'use strict';

const Phone = require('../models/phone');

module.exports = async ctx => {

	let phone = await Phone.findOne({ phone: ctx.params.phone });

	ctx.body = { exist: !!phone }
};