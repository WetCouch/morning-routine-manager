require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_bodyparser__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_bodyparser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_bodyparser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_koa_session__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_koa_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_koa_session__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_apollo_server_koa__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_apollo_server_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_apollo_server_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_nuxt__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_nuxt__);
 // koa@2






const app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();
const router = new __WEBPACK_IMPORTED_MODULE_1_koa_router___default.a();
const PORT = process.env.port || 3000;

// koaBody is needed just for POST.
app.use(__WEBPACK_IMPORTED_MODULE_2_koa_bodyparser___default()());

//session setup
app.keys = ['!lyN@mIsAwes0m3#'];
app.use(__WEBPACK_IMPORTED_MODULE_3_koa_session___default()({
  key: 'koa:session',
  maxAge: 86400000,
  overwrite: true
}, app));

// router.post('/graphql', graphqlKoa({ schema: myGraphQLSchema }));
// router.get('/graphql', graphqlKoa({ schema: myGraphQLSchema }));


router.all('/graphql', Object(__WEBPACK_IMPORTED_MODULE_4_apollo_server_koa__["graphqlKoa"])(ctx => {
  return {
    schema,
    pretty: true,
    context: ctx
  };
}));

const config = __webpack_require__(7);
config.dev = !("development" === 'production');
config.srcDir = 'src/';

const nuxt = new __WEBPACK_IMPORTED_MODULE_5_nuxt__["Nuxt"](config);

if (config.dev) new __WEBPACK_IMPORTED_MODULE_5_nuxt__["Builder"](nuxt).build().catch(e => {
  console.error(e);
  process.exit(1);
});

app.use(ctx => {
  ctx.status = 200; // koa defaults to 404 when it sees that status is unset

  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve);
    ctx.res.on('finish', resolve);
    ctx.req.session = ctx.session; // for nuxtServerInit
    ctx.req.state = ctx.state; // for nuxtServerInit

    nuxt.render(ctx.req, ctx.res, promise => {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject);
    });
  });
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, err => {
  if (err) console.error(err);else console.log(`> Server is listening on 0.0.0.0:${PORT}`);
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("koa-session");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("apollo-server-koa");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const { resolve } = __webpack_require__(8);

module.exports = {
  /*
  ** Headers of the page
  */
  srcDir: "src/",
  head: {
    title: 'morning-routine-manager',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'An intelligent morning task and habit manager' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  modules: ['@nuxtjs/apollo'],
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
    extend(config, ctx) {
      config.resolve.alias = Object.assign({}, config.resolve.alias, {
        'config': resolve(__dirname)
      });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, "config"))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map