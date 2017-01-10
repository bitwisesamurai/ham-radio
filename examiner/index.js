#!/usr/bin/env node

var program = require('commander'),
    parser = require('./lib/parser');

var inputFilename;

program.arguments('<file>')
  .action((file) => {
    console.log('- File: %s', file);

    inputFilename = file;
  })
  .parse(process.argv);

const onComplete = (result) => {
  console.log('- Result:', JSON.stringify(result, null, '\t'));
};

parser.parse(inputFilename, onComplete);
