'use strict';

const Phone = require('../models/phone');

module.exports = async ctx => {

	await Phone.deleteOne({ phone: ctx.params.phone }); // TODO: escape ctx.params.phone

	ctx.body = 204;
};