const replace = require('replace-in-file');
const title   = require('./data/title');

replace({

  //Glob(s)
  files: [
    '*.html',
  ],

  //Replacement to make (string or regex)
  from: /<title>.*<\/title>/g,
  to: '<title>' + title + '</title>',

  //Specify if empty/invalid file paths are allowed (defaults to false)
  //If set to true these paths will fail silently and no error will be thrown.
  allowEmptyPaths: true,
})
  .then(changedFiles => {
    console.log('Modified files:', changedFiles.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
