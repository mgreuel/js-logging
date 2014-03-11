if (typeof (app) === 'undefined' || app === null) {
    throw new Error("global object 'app' is required");
}

if (!app.logger) {
    throw new Error("app object 'logger' is required");
}

if (typeof ($) === 'undefined') {
    throw new Error("global object '$' (jQuery) is required");
}

if (typeof ($.cookie) === 'undefined') {
    throw new Error("the jQuery cookie plugin is required");
}

window.app.logger.addAppender(
    (function (app) {
 
    	var log = function (category, logLevel, message) {

    	    if (isLogLevelEnabled(logLevel) || isUserEnabled()) {

    			if (!app.config.serviceAppender.logServiceUrl) {
    				throw new Error("The log service URL must be configured");
    			}

    			var fullLogServiceUrl = app.config.serviceAppender.logServiceUrl;
    			var logData = { 'category': category, 'logLevel': logLevel, 'message': message };

    			$.post(fullLogServiceUrl, logData).error(function () {
    				return true;
    			});
    		}
    	},
            isLogLevelEnabled = function (logLevel) {

            	var isEnabled = false;

            	if (typeof (app.config.serviceAppender) !== 'undefined') {
            		isEnabled = app.config.serviceAppender['is' + logLevel + 'Enabled'] === true;
            	}

            	return isEnabled;
            },
            isUserEnabled = function () {

            	return typeof (app.config.serviceAppender.allowServiceLoggingByCookie) !== 'undefined' &&
                    app.config.serviceAppender.allowServiceLoggingByCookie === true &&
                        $.cookie("enableServiceLogging") === "true";
            };

    	return {
    		log: log
    	};
    })(window.app));
