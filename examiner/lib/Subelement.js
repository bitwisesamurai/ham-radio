'use strict';

var regexp = require('./regexp');

class Subelement {
  static parse(line) {
    // Example SUBELEMENT line:
    //
    // SUBELEMENT T1 – FCC Rules, descriptions and definitions for the Amateur Radio Service, operator and station license responsibilities - [6 Exam Questions - 6 Groups]
    //
    // Extract...
    //
    // - The sub-element's name (i.e. 'T0') and description
    // - The number of questions that are randomly drawn from the sub-element during an exam
    // - The number of groups in the sub-element
    const match = regexp.getMatch(/^[A-Z]+ +(T\d{1,}) +-? *(?:(.+?) *-? *)(?:\[(\d+).+ - (\d+).+\])$/, line);

    // Note: "replace(/\uFFFD/g, '')" removes every instance of the Unicode replacement character from the
    //       sub-element's description
    return {
      name: match[1],
      subelement: {
        description: match[2].replace(/\uFFFD/g, '').trim(),
        numExamQuestions: match[3],
        numGroups: match[4],
        groups: []
      }
    };
  }
}

module.exports = Subelement;
