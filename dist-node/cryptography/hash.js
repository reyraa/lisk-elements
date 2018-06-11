'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true,
});

var _tweetnacl = require('tweetnacl');

var _tweetnacl2 = _interopRequireDefault(_tweetnacl);

var _tweetnaclUtil = require('tweetnacl-util');

var _tweetnaclUtil2 = _interopRequireDefault(_tweetnaclUtil);

var _jsSha = require('js-sha256');

var _jsSha2 = _interopRequireDefault(_jsSha);

var _convert = require('./convert');

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

/*
 * Copyright © 2018 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
_tweetnacl2.default.util = _tweetnaclUtil2.default;

var cryptoHashSha256 = function cryptoHashSha256(data) {
	var hash = _jsSha2.default.create();
	hash.update(data);
	return new Uint8Array(hash.array());
};

var hash = function hash(data, format) {
	if (Buffer.isBuffer(data)) {
		return Buffer.from(cryptoHashSha256(data)); // :: should I remove Buffer.from?
	}

	if (typeof data === 'string') {
		if (!['utf8', 'hex'].includes(format)) {
			throw new Error(
				'Unsupported string format. Currently only `hex` and `utf8` are supported.',
			);
		}
		var encoded =
			format === 'utf8'
				? _tweetnacl2.default.util.decodeUTF8(data)
				: (0, _convert.hexToBuffer)(data);
		return cryptoHashSha256(encoded);
	}

	throw new Error(
		'Unsupported data format. Currently only Buffers or `hex` and `utf8` strings are supported.',
	);
};

exports.default = hash;
