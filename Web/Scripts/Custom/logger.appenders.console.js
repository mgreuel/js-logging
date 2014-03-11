/*global log app */
/*jshint laxbreak: true, smarttabs: true, jquery: true, browser: true, devel: true */

if (typeof (window.app) === 'undefined' || window.app === null) {
	throw new Error("global object 'app' is required");
}

if (!window.app.logger) {
	throw new Error("app object 'logger' is required");
}

window.app.logger.addAppender(
	(function (app) {

		var log = function (category, logLevel, message) {

			if (typeof (logLevel) === 'undefined') {
				throw new Error("The logLevel must be defined.");
			}

			if (isLogLevelEnabled(logLevel)) {

				if (window.console && window.console.log) {
					if (typeof message === 'object') {
						window.console.log('[' + logLevel + '] [' + category + ']: >> (Object on next line)');
						window.console.log(message);
					}
					else {
						window.console.log('[' + logLevel + '] [' + category + ']: ' + message);	
					}
				}
			}
		},
			isLogLevelEnabled = function (logLevel) {

				var isEnabled = false;

				if (app.config.consoleAppender) {
					isEnabled = app.config.consoleAppender['is' + logLevel + 'Enabled'] === true;
				}

				return isEnabled;
			};

		return {
			log: log
		};
	})(window.app));
