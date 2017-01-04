const React  = require('react');

import {xs, sm, md, lg} from "../Messages/styles/mediaSizes.js";
import matchmedia from "matchmedia-polyfill";

var mqlxs = window.matchMedia(xs);
var mqlsm = window.matchMedia(sm);
var mqlmd = window.matchMedia(md);
var mqllg = window.matchMedia(lg);

function withScreenSize(WrappedComponent) {

  return React.createClass({

    getInitialState: function() {

      var screenSize;
      if (mqlxs.matches) {
        screenSize = "xs";
      }
      if (mqlsm.matches) {
        screenSize = "sm";
      }
      if (mqlmd.matches) {
        screenSize = "md";
      }
      if (mqllg.matches) {
        screenSize = "lg";
      }

      return {screenSize};
    },

    componentWillMount: function() {
      mqlxs.addListener(this.onMediaChangeXs);
      mqlsm.addListener(this.onMediaChangeSm);
      mqlmd.addListener(this.onMediaChangeMd);
      mqllg.addListener(this.onMediaChangeLg);
    },

    componentWillUnmount: function() {
      mqlxs.removeListener(this.onMediaChangeXs);
      mqlsm.removeListener(this.onMediaChangeSm);
      mqlmd.removeListener(this.onMediaChangeMd);
      mqllg.removeListener(this.onMediaChangeLg);
    },

    onMediaChangeXs: function(data) {
      this.onMediaChange(data, "xs");
    },

    onMediaChangeSm: function(data) {
      this.onMediaChange(data, "sm");
    },

    onMediaChangeMd: function(data) {
      this.onMediaChange(data, "md");
    },

    onMediaChangeLg: function(data) {
      this.onMediaChange(data, "lg");
    },


    onMediaChange: function(data, size) {
      console.log(data);
      if (data.matches) {
        this.setState({screenSize: size});
      }
    },

    render: function() {
      return (
        <WrappedComponent {...this.props} {...this.state} />
      )
    }
  });


}

module.exports = withScreenSize;
