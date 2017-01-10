'use strict';

var fs = require('fs'),
    readLine = require('readline');

var Line = require('./Line');

var Subelement = require('./Subelement'),
    Group = require('./Group'),
    Question = require('./Question');

const getMatch = (regexp, line) => regexp.exec(line);

module.exports = function() {
  var exam = {};

  var state = {
    sublement: null,
    group: null,
    question: null
  };

  const parse = (filename, complete) => {
    var lineReader = readLine.createInterface({
      input: fs.createReadStream(filename)
    });

    // Parse each line in the specified file...
    lineReader.on('line', (line) => {
      switch (Line.type(line, state)) {
        case 'sub-element':
          // Sub-elements (which contain multiple groups) 
          state.subelement = Subelement.parse(line);

          // Add the current subelement to exam (using its name as the key)
          exam[state.subelement.name] = state.subelement.subelement;

          break;
        case 'group':
          // Groups (which contain multiple questions)
          //
          // TODO: Are there any groups that only contain one question?
          state.group = Group.parse(line, state.subelement);

          // Add the current group to the current subelement's list of groups
          state.subelement.subelement.groups.push(state.group);

          break;
        case 'question-start':
          state.question = Question.parseStart(line, state.group);

          state.group.questions.push(state.question);

          break;
        case 'question':
          state.question.question = line;

          break;
        case 'question-option':
          state.question.options.push(Question.parseOption(line));

          break;
        case 'question-end':
          state.question = null;

          break;
        default:
          // TODO: Clean up/remove the debugging statement
          //console.log('* Line:', line);
      }
    });

    // ...And pass the result to the complete callback when the end of the file is reached
    lineReader.on('close', () => {
      complete(exam);
    });
  };

  return {
    parse: parse
  };
}();
