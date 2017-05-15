var _          = require('lodash');
var navbarMenu = require('./data/navbarMenu.json');
var jsonfile   = require('jsonfile');

var compatibleMenu = { "navbarMenu" : [] };
var categoriesMenu = { "categories" : [] };

var createCategoryObject = (key, val) => {
  if (_.isString(val)) {
    return {
      "name": key
    };
  }

  var subelements = _.map(val, (val, key) => {
    return createCategoryObject(key, val);
  });

  return {
    "name": key,
    "subelements": subelements
  };
}

var createMenuObject = (key, val) => {
  if (_.isString(val)) {
    return {
      "name": key,
      "href": val
    };
  }

  if (key == "Stichwortsuche") {
    categoriesMenu.categories = _.map(val, (val, key) => {
      return createCategoryObject(key, val);
    });
    return {
      "name": key,
      "href": "#categoryList"
    }
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

var file1 = './data/navbarMenu--compatible.json';

jsonfile.writeFile(file1, compatibleMenu, function (err) {
  if (err) {
    console.error(err);
  }
});

var file2 = './data/navbarMenu--categories.json';

jsonfile.writeFile(file2, categoriesMenu, function (err) {
  if (err) {
    console.error(err);
  }
});
