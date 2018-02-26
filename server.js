/*** ✰✰✰ Konstantin Aleksandrov ✰✰✰ ***/

/*
 ================================
 ===          SERVER          ===
 ================================
 */

'use strict';

global.__DEV__ 	 = process.env.NODE_ENV === 'development';
global.__DEBUG__ = process.env.NODE_ENV === 'debug' || process.env.NODE_ENV === 'debugging';

const semver = require('semver');
if (semver.lt(semver.clean(process.versions.node), '8.4.0') || parseFloat(process.versions.v8) < 6.0) {
	/* jshint -W101 */
	console.log('\n*********************************************\n* Для запуска требуется Node.js v8.4 и выше *\n* Для запуска требуется V8 v6.0 и выше      *\n* ----------------------------------------- *\n* Текущая версия Node.js ' + process.versions.node + '              *\n* Текущая версия V8 ' + process.versions.v8 + '              *\n*********************************************\n');
	process.exit(0);
}
const fs            = require('fs');
const path          = require('path');
const join          = path.join;
const glob          = require('glob');
const koa           = require('koa');
const app           = new koa();
const helmet        = require('koa-helmet');
const Router        = require('koa-router');
const config        = require('config');
const bunyan        = require('bunyan');
const devLogger     = require('koa-logger');
const CLS           = require('continuation-local-storage');
const ns            = CLS.createNamespace('app');
const uuid          = require('uuid/v4');
const responseTime  = require('koa-response-time');
const conditional   = require('koa-conditional-get');
const etag          = require('koa-etag');
const compose       = require('koa-compose');
const userAgent     = require('koa-useragent');
const chokidar      = require('chokidar');

require('events').EventEmitter.defaultMaxListeners = Infinity;

app.keys = [config.secret];

if (process.env.TRACE) require('./libs/trace')();

if (__DEV__) {
	app.use(responseTime());
	app.use(devLogger());

	const watcher = chokidar.watch(
		glob.sync('./handlers/**/*.*')
	);

	watcher.on('ready', () => {
		watcher.on('all', (ev, filePath) => {
			console.log('SERVER HOT UPDATE: Clearing \'/handlers\', \'/middlewares\', \'/libs\' module cache from server');
			Object.keys(require.cache).forEach(id => {
				if (/|[\/\\]middlewares[\/\\]|[\/\\]libs[\/\\]|[\/\\]handlers[\/\\]/.test(id)) {
					console.log('delete from require.cache', id);
					delete require.cache[id];
				}
			});
		});
	});
} else {
	app.use(helmet());
}

app.use(conditional());
app.use(etag());

app.use(userAgent);

let log = bunyan.createLogger({
	name: 'APP',
	requestId: uuid(),
	streams: [
		{
			level: 'error',
			path: join(config.projectRoot, './logs/errors.log')
		}
	]
});

process.on('unhandledRejection', err => {
	console.error(err);
	log.error(err);
	process.exit(1);
});
process.on('uncaughtException', err => {
	console.error(err);
	log.error(err);
	process.exit(1);
});

app.use(async (ctx, next) => {
	let context = ns.createContext();
	ns.enter(context);
	ns.bindEmitter(ctx.req);
	ns.bindEmitter(ctx.res);
	try {

		ns.set('logger', log);

		await next();

	} finally {

		if(ns.get('logger').requestId != log.requestId) {
			console.error('CLS: wrong context', ns.get('logger').requestId, 'should be', ctx.log.requestId);
		}
		ns.exit(context);
	}
});


/**
 DEFAULT MIDDLEWARES
 **/
const Middlewares = glob.sync(`${config.projectRoot}/middlewares/*.js`).sort((a, b) => parseInt(a) - parseInt(b));

if (__DEV__) {
	Middlewares.forEach(mw => { app.use(async (ctx, next) => { await require(mw)(ctx, next); }); });
} else {
	app.use(compose(Middlewares.map(mw => require(mw))));
}

app.use(async (ctx, next) => {
	ctx.log = ns.get('logger');
	await next();
});

/**
 ROUTES
 **/
const router = new Router();
	  router.post('/__log', async ctx => { ctx.throw(0, ctx.request.body); }); // TODO: настроить логирование с клиента

router
	.get('/', ctx => { ctx.render('index') })
	.get('/signin', ctx => { ctx.render('index') })
	.get('/phones', ctx => { ctx.render('index') });

app.use(router.routes());

const Routes = glob.sync(`${config.projectRoot}/handlers/**/router.js`);

if (__DEV__) {
	Routes.forEach(route => {
		app.use(async (ctx, next) => { await require(route).routes()(ctx, next) });
	});
	app.use(require('./webpack.dev-middleware'));
} else {
	app.use(compose(Routes.map(router => {
		return require(router).routes()
	})));
}

const server = app.listen(config.port);
console.log('SERVER LISTENING ON PORT:', config.port);

module.exports = server;