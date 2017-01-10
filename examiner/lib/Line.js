'use strict';

/** A class that determines the type of each input line it's passed. */
class Line {

  static type(line, state) {
    var result = '';

    if (/^SUBELEMENT/.test(line)) {
      result = 'sub-element';
    } else if (state.subelement != null &&
               new RegExp('^' + state.subelement.name + '[A-Z]+ +[-–]?').test(line)) {
      result = 'group';
    } else if (state.group != null &&
               new RegExp('^' + state.group.name + '\\d{1,} +\\(.\\)(?: +\[.*\])?$').test(line)) {
      result = 'question-start';
    } else if (state.question) {
      if (/^[ABCD]?\. +.*$/.test(line)) {
        result = 'question-option';
      } else if (/^~~$/.test(line)) {
        result = 'question-end';
      } else {
        result = 'question';
      }
    }

    return result;
  }
}

module.exports = Line;
