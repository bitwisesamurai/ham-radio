'use strict';

const getMatch = (regexp, line) => regexp.exec(line);

module.exports = {
	getMatch: getMatch
};
