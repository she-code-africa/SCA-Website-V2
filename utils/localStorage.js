var { LocalStorage } = require('node-localstorage');

let localStorage;

if (typeof localStorage === 'undefined' || localStorage === null) {
	localStorage = new LocalStorage('./localStorage');
}

module.exports = localStorage;
