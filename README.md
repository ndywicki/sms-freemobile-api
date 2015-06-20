Free Mobile SMS API
============
This node JS module allow you to send SMS to your Free Mobile phone.

## Requirements

1. You need an activated Free Mobile phone number
2. The option "Notifications par SMS" must be activated on the [account settings page](https://mobile.free.fr/moncompte/index.php?page=options)


## Installation
```
npm install sms-freemobile-api
```

## Usage

Send SMS:
```javascript
var Sms = require('sms-freemobile-api');

var sms = new Sms({
	user: 'myUsername',
	pass: 'myPrivateKey'
});

sms.sent('Hello world!', function(res){	
	if(!res && res.statusCode != 200) {
		console.log('oh ho');	
	} else {
		console.log('Yeah !');
	}
});
```

## API Codes:
- 200 Success
- 400 One of needed parameters is missed or incorrect
- 402 Too many requests sent, please wait few time
- 403 Access denied, check your credentials
- 500 SMS API got an internal error, try again later