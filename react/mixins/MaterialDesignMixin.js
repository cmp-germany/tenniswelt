var componentHandler = require('exports?componentHandler!material-design-lite/material.js')

var MaterialDesignMixin = {
  componentDidMount: function () {
    componentHandler.upgradeDom()
  },

  componentDidUpdate: function () {
    componentHandler.upgradeDom()
  }
}

module.exports = MaterialDesignMixin
