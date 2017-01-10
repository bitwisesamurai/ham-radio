'use strict';

var regexp = require('./regexp');

class Group {
  static parse(line, subelement) {
    // Example group line:
    //
    // T1A - Amateur Radio Service: purpose and permissible use of the Amateur Radio Service; operator/primary station license grant; where FCC rules are codified; basis and purpose of FCC rules; meanings of basic terms used in FCC rules; interference; spectrum management
    //
    // Extract the group's name (i.e. 'T0A') and description
    const match = regexp.getMatch(new RegExp('^(' + subelement.name + '[A-Z]+) +[-–]? ?(.*)$'), line);

    // Note: "replace(/\uFFFD/g, '')" removes every instance of the Unicode replacement character from the
    //       group's description
    return {
      name: match[1],
      description: match[2].replace(/\uFFFD/g, '').trim(),
      questions: []
    };
  }
}

module.exports = Group;
