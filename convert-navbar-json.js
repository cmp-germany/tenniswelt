var _          = require('lodash');
var navbarMenu = require('./data/navbarMenu.json');
var jsonfile   = require('jsonfile');

var compatibleMenu = { "navbarMenu" : [] };

var createMenuObject = (key, val) => {
  if (_.isString(val)) {
    return {
      "name": key,
      "href": val
    };
  }

  var subelements = _.map(val, (val, key) => {
    return createMenuObject(key, val);
  });

  return {
    "name": key,
    "subelements": subelements
  };
}


compatibleMenu.navbarMenu = _.map(navbarMenu, (val, key) => {
  return createMenuObject(key, val);
});

var file = './data/navbarMenu--compatible.json';

jsonfile.writeFile(file, compatibleMenu, function (err) {
  console.error(err)
});
