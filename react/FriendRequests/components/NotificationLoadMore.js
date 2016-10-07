var React = require('react');
var MaterialDesignMixin = require('../../mixins/MaterialDesignMixin.js');

var NotificationLoadMore = React.createClass({
	mixins: [MaterialDesignMixin],
	render: function(){
		return (
			<div className="notification notification--load-more">
				<div className="notification__spinner mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
			</div>
		);
	}
});
module.exports = NotificationLoadMore;