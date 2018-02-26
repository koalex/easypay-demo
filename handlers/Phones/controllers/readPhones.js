'use strict';

const Phone = require('../models/phone');

module.exports = async ctx => {
	ctx.body = await Phone.find();
};