var React = require('react');
var MaterialDesignMixin = require('../../mixins/MaterialDesignMixin.js');
var CVM = require("react-component-visibility");

var NotificationLoadMore = React.createClass({
	mixins: [MaterialDesignMixin, CVM],

	getInitialState: function() {
		return {
			isLoading: false
		}
	},

	onLoadingDone: function() {
		this.setState({isLoading: false});
	},

	componentVisibilityChanged: function() {
    var visible = this.state.visible;
    if (visible && !this.state.isLoading && this.props.onLoadMore) {
      this.props.onLoadMore(this.onLoadingDone);
    }
  },

	render: function(){
		return (
			<div className="notification notification--load-more">
				<div className="notification__spinner mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
			</div>
		);
	}
});
module.exports = NotificationLoadMore;
