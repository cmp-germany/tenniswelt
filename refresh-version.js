const replace = require('replace-in-file');

var time = Math.round(new Date().getTime()/1000)

replace({

  //Glob(s)
  files: [
    '*.html',
    'modules/*.html',
  ],

  //Replacement to make (string or regex)
  from: /\?v=[0-9]+/g,
  to: '?v=' + time,

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
