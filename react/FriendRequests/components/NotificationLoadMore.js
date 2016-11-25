var React = require('react');
var MaterialDesignMixin = require('../../mixins/MaterialDesignMixin.js');
var CVM = require("react-component-visibility");
var TimerMixin = require('react-timer-mixin');

var NotificationLoadMore = React.createClass({
	mixins: [MaterialDesignMixin, CVM, TimerMixin],

	getInitialState: function() {
		return {
			isLoading: false
		}
	},

	componentDidMount() {
		this.setInterval(this.checkComponentVisibility, 500);
	},

	onLoadingDone: function() {
		if(this.isMounted()) {
			this.setState({isLoading: false});
		}
	},

	componentVisibilityChanged: function() {
    var visible = this.state.visible;
    if (visible && !this.state.isLoading && this.props.onLoadMore) {
			this.setState({isLoading: true});
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
