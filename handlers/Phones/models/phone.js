/*** ✰✰✰ Konstantin Aleksandrov ✰✰✰ ***/

/*
 ================================
 ===        PHONE MODEL       ===
 ================================
*/

'use strict';

const mongoose = require('../../../libs/mongoose');
const validate = require('mongoose-validator');

var phoneValidator = [
    /*validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Номер телефона должен содержать минимум {ARGS[0]} и максимум {ARGS[1]} цифр',
    }),*/
    validate({
        validator: 'isNumeric',
        passIfEmpty: false,
        message: 'Телефон должен состоять только из цифр',
    })
];

const dateRangeValidator = (min, max, message = 'внутренняя ошибка сервера') => [
    validate({
        validator: function (v) {
            let val = v, _min = min, _max = max;
            if (v.getTime) val = v.getTime();
            if ('function' == typeof min) _min = min();
            if ('function' == typeof max) _max = max();

            return val <= _max && val >= _min;
        },
        message: message
    })
];

const isObjectId = [
    validate({
        validator: 'isMongoId',
        message: 'внутренняя ошибка сервера'
    })
];

const phoneSchema = new mongoose.Schema({
    phone: { type: String, unique: true, validate: phoneValidator, required: [true, 'отсутствует телефон'], trim: true },
    created_at: { type: Date, default: Date.now, validate: dateRangeValidator((new Date('2018-01-01')).getTime(), Date.now) },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', /*required: [true, 'httpErrors.500'],*/ validate: isObjectId },
},
{
    versionKey: false,
    autoIndex: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    id: false,
    minimize: true,
    // safe: { j: 1, w: 2, wtimeout: 10000 }, // only if replica
    retainKeyOrder: true
});

module.exports = mongoose.model('Phones', phoneSchema);
