var querystring = require("querystring");
var https = require('https');
//https unauth disable
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


/**
 * Sms sender for FreeMobile API
 * @constructor
 *
 * @param {Object} opts
 */
function Sms(opts) {

  if (!(this instanceof Sms)) {
    return new Sms(opts);
  }

  // Ensure opts is an object
  opts = opts || {};
  
  // API user 
  this.user = opts.user || null;
  
  // API password
  this.pass = opts.pass || null;
  
  // Message
  this.message = opts.message || null;    
}


Sms.prototype.sent = function(message, callback) {
	
	//Check params
	if(!(this.user && this.pass)) {
		console.error('User and password are empty, check the init constructor');
	}
	var msg = message || this.message;
	
	//Setup https options
	options = {
      rejectUnauthorized: false,
      host: 'smsapi.free-mobile.fr',
      port: 443,
      path: '/sendmsg?user=' + this.user + '&pass=' + this.pass + '&msg=' + msg,
      method:'POST',
      ca: https.globalAgent.options.ca,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(querystring.stringify(msg), 'UTF-8')
      }
    };
	
	//Call URL
	https.get(options, function(res) {
		res.resume();
		if(callback) callback(res);
	}).on('error', function(e) {
		console.error(e);		
	});
};

module.exports = Sms;