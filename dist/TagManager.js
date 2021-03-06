'use strict';

var _Snippets = require('./Snippets');

var _Snippets2 = _interopRequireDefault(_Snippets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagManager = {
	dataScript: function dataScript(dataLayer) {
		var script = document.createElement('script');
		script.innerHTML = dataLayer;
		return script;
	},

	gtm: function gtm(args) {
		var snippets = _Snippets2.default.tags(args);

		var noScript = function noScript() {
			var noscript = document.createElement('noscript');
			noscript.innerHTML = snippets.iframe;
			return noscript;
		};

		var script = function script() {
			var script = document.createElement('script');
			script.id = 'gtm-loader';
			script.innerHTML = snippets.script;
			return script;
		};

		var dataScript = this.dataScript(snippets.dataLayerVar);

		return {
			noScript: noScript,
			script: script,
			dataScript: dataScript
		};
	},

	initialize: function initialize(_ref) {
		var gtmId = _ref.gtmId,
		    _ref$events = _ref.events,
		    events = _ref$events === undefined ? {} : _ref$events,
		    dataLayer = _ref.dataLayer,
		    _ref$dataLayerName = _ref.dataLayerName,
		    dataLayerName = _ref$dataLayerName === undefined ? 'dataLayer' : _ref$dataLayerName,
		    _ref$auth = _ref.auth,
		    auth = _ref$auth === undefined ? '' : _ref$auth,
		    _ref$preview = _ref.preview,
		    preview = _ref$preview === undefined ? '' : _ref$preview,
		    _ref$noAutoRun = _ref.noAutoRun,
		    noAutoRun = _ref$noAutoRun === undefined ? false : _ref$noAutoRun;

		var gtm = this.gtm({
			id: gtmId,
			events: events,
			dataLayer: dataLayer || undefined,
			dataLayerName: dataLayerName,
			auth: auth,
			preview: preview,
			noAutoRun: noAutoRun
		});

		if (dataLayer) document.head.appendChild(gtm.dataScript);

		var scriptFound = document.querySelector('head script#gtm') || document.querySelector('head script[src^="https://www.googletagmanager.com/gtm.js?"]');
		var scriptLoaderFound = document.querySelector('head script#gtm-loader');

		if (!scriptFound && !scriptLoaderFound) document.head.insertBefore(gtm.script(), document.head.childNodes[0]);

		// kill this because it would never run...
		//if(!document.querySelector('body iframe[src^="https://www.googletagmanager.com/ns.html"]'))
		//	document.body.insertBefore(gtm.noScript(), document.body.childNodes[0])
	},
	dataLayer: function dataLayer(_ref2) {
		var _dataLayer = _ref2.dataLayer,
		    _ref2$dataLayerName = _ref2.dataLayerName,
		    dataLayerName = _ref2$dataLayerName === undefined ? 'dataLayer' : _ref2$dataLayerName;

		if (window[dataLayerName]) return window[dataLayerName].push(_dataLayer);

		var snippets = _Snippets2.default.dataLayer(_dataLayer, dataLayerName);
		var dataScript = this.dataScript(snippets);

		document.head.appendChild(dataScript);
	}
};

module.exports = TagManager;