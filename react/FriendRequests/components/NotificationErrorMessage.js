var React = require('react')
var MaterialDesignMixin = require('../../mixins/MaterialDesignMixin.js')

var NotificationErrorMessage = React.createClass({
  getTranslation: function (word) {
    if (!word) return ''
    try {
      return this.props.languageResource(word)
    } catch (err) {
      console.log(word + ' is not translated!')
      return word
    }
  },
  render: function () {
    var reloadLink = ''
    if (this.props.onReload) {
      reloadLink = (<a className='notification__error-link' href='javascript:void(0)' onClick={this.props.onReload}>{this.getTranslation('retry')}</a>)
    }
    return (
      <div className='notification notification--error'>
        <div className='notification__error'>
          {this.props.errorMessage}
          {reloadLink}
        </div>
      </div>
    )
  }
})

module.exports = NotificationErrorMessage
