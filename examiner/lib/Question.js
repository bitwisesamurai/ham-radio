'use strict';

var regexp = require('./regexp');

class Question {
  static parseStart(line, group) {
    // Example question start line:
    //
    // T1A06 (D) [97.101 (d), 97.303 (o)(2)]
    //
    // Extract...
    //
    // - The question's number (i.e. '04')
    // - The answer (i.e. 'C')
    // - TODO: ? (i.e. '97.101 (d), 97.303 (o)(2)')
    const match =
      regexp.getMatch(new RegExp('^' + group.name + '(\\d{1,}) +\\((.)\\)(?: +\[(.*)\])?$'), line);

    return {
      number: match[1],
      question: '',
      answer: match[2],
      info: match[3],
      options: []
    };
  }

  static parseOption(line) {
    // Example option line:
    //
    // A. Citizens Radio Service
    //
    // Extract...
    //
    // - The option (i.e. 'A')
    // - The option's text (i.e. 'Citizens Radio Service')
    const match = regexp.getMatch(/^([ABCD])\. +(.*)$/, line);

    return {
      option: match[1],
      question: match[2]
    };
  }
}

module.exports = Question;
