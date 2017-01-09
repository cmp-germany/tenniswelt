const React  = require('react');

import matchmedia from "matchmedia-polyfill";
import _ from "lodash";

function withScreenSize(WrappedComponent, screenSizes) {

  //create an array of objects
  var screenSizeObjects = _.map(screenSizes, function(v, k){
    return {id: k, size: v};
  });

  //get out the max size (size: false)
  var max = _.find(screenSizeObjects, {size: false});
  screenSizeObjects = _.filter(screenSizeObjects, function(screenSizeObject){
    return screenSizeObject.size
  });

  //sort the properties by size
  screenSizeObjects = _.sortBy(screenSizeObjects, 'size');

  //add the max size at the end
  if (max) {
    screenSizeObjects.push(max);
  }

  //create the media strings
  var lastValue;
  var mediaStringObjects = screenSizeObjects.map(function(screenSizeObject){
    var mediaStringObject = {id: screenSizeObject.id};

    if (!lastValue) {
      mediaStringObject.mediaString =
        "(max-width: " + screenSizeObject.size + "px)";

    } else if (!screenSizeObject.size) {
      mediaStringObject.mediaString =
        "(min-width: " + (lastValue + 1) + "px)";

    } else {
      mediaStringObject.mediaString =
        "(min-width: " + (lastValue + 1) + "px) and (max-width: " + screenSizeObject.size + "px)";
    }

    lastValue = screenSizeObject.size;
    return mediaStringObject

  })

  //create the media query list objects
  var mqls = mediaStringObjects.map(function(mediaStringObject){
    mediaStringObject.mql = window.matchMedia(mediaStringObject.mediaString);
    return mediaStringObject;
  });

  return React.createClass({

    getInitialState: function() {
      var matches = _.find(mqls, function(mql){return mql.mql.matches});

      return {
        screenSize: matches.id,
      };
    },

    componentDidMount: function() {
      _.forEach(mqls, function(mql){
        mql.listener = function(data){
          this.onMediaChange(data, mql.id);
        }.bind(this);
        mql.mql.addListener(mql.listener);
      }.bind(this));
    },

    componentWillUnmount: function() {
      _.forEach(mqls, function(mql){
        mql.mql.removeListener(mql.listener);
      });
    },

    onMediaChange: function(data, size) {
      console.log("onMediaChange. WrappedComponent: ", this.props);
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
