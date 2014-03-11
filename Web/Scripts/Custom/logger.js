if (typeof (window.app) === 'undefined' || window.app === null) {
    throw new Error("global object 'app' is required");
}

app.logger = (function (app) {

	var appenders = [],

        isLogLevelEnabled = function (logLevel) {
        	var isEnabled = false;

        	if (app.config && app.config.logger) {
        		isEnabled = app.config.logger['is' + logLevel + 'Enabled'] === true;
        	}

        	return isEnabled;
        },
        debug = function (message, category) {
        	log(category, "Debug", message);
        },
        info = function (message, category) {
        	log(category, "Info", message);
        },
        warn = function (message, category) {
        	log(category, "Warn", message);
        },
        error = function (message, category) {
        	log(category, "Error", message);
        },
        log = function (category, logLevel, message) {

        	if (typeof (message) === 'undefined') {
        		throw new Error("a message must be provided");
        	}

        	if (typeof (category) === 'undefined') {
        		category = "";
        	}

        	if (isLogLevelEnabled(logLevel)) {

        		for (var i = 0; i < appenders.length; i++) {
        		    try {
        				appenders[i].log(category, logLevel, message);
        			} catch (e) {
        				// one failing appender must not cause skipping of other appenders
        				try {
        					if (window.console && window.console.log) {
        						window.console.log(e);
        					}
        				} catch (consoleException) {
        				}
        			}
        		}
        	}
        },
        addAppender = function (appender) {
        	/// <summary>Adds the specified appender to the logger. All log messages will be forwarded to the appender.</summary>
        	/// <param name="appender">Required: The appender to which the log messages will be forwarded. Must implement a 'log' function.</param>

        	if (typeof (appender) === 'undefined') {
        		throw new Error("Nullargument: appender");
        	}

        	appenders.push(appender);
        };

	return {
		debug: debug,
		info: info,
		warn: warn,
		error: error,
		addAppender: addAppender
	};
})(window.app);