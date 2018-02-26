/*** ✰✰✰ Konstantin Aleksandrov ✰✰✰ ✰✰✰ ***/

/*
 ================================
 ===        USER ROUTER       ===
 ================================
*/

'use strict';

const Router = require('koa-router');
const router = new Router();
const ApiV1  = new Router({ prefix: '/api/v1' });

const authMW         = require('../Users/middlewares/jwtAuth');
const createPhone    = require('./controllers/createPhone');
const readPhones    = require('./controllers/readPhones');
const checkPhone     = require('./controllers/checkPhone');
const deletePhone    = require('./controllers/deletePhone');

// ApiV1.post('/phones',             authMW, createPhone);
// ApiV1.get('/phones',              authMW, readPhones);
// ApiV1.get('/phones/:phone/check', authMW, checkPhone);
// ApiV1.del('/phones/:phone',       authMW, deletePhone);

ApiV1.post('/phones',              createPhone);
ApiV1.get('/phones',               readPhones);
ApiV1.get('/phones/:phone/check',  checkPhone);
ApiV1.del('/phones/:phone',        deletePhone);

router.use(ApiV1.routes());

module.exports = router;
