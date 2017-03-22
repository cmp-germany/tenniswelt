var IfNotNullModule = React.createClass({
  render: function () {

    var isWrap = false;

    // Check, if Container should be rendered
    if(Array.isArray(this.props.check)) {
      for (var i = 0; i < this.props.check.length; i++) {
        if(!this.props.check[i]) return null;
      }
    } else if (!this.props.check) {
      return null;
    }

    // Check, if content needs to be wrapped
    if (React.Children.count(this.props.children) > 1) {
      isWrap = true;
    }

    if(!isWrap) {
      return this.props.children;
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var InputFieldModule = React.createClass({
  render: function () {

    var inputField;

    switch (this.props.data.inputType) {

      case "text":
      case "email":
      case "password":
        inputField = (
          <input type={this.props.data.inputType} className="form-control" placeholder={this.props.data.label} />
        )
        break;

      case "select":
        var options = this.props.data.options.map(function(option, index){ return (
          <option value={option} key={index}>{option}</option>
        );});
        inputField = (
          <select className="form-control">{options}</select>
        );
        break;

      default:
        console.error('Unknown inputType: "' + this.props.data.inputType + '". Data Property:', this.props.data);
    }

    return (
      <div className="form-group">
        {inputField}
      </div>
    );
  }
});

var KeyFeatureModule = React.createClass({
  render: function () {
    var data = this.props.data;

    var icon;
    if (data.icon) {
      icon = <i className="material-icons key-feature__icon text-center">{data.icon}</i>;
    }
    if (data.picture) {
      icon = <img src={data.picture} className="key-feature__icon text-center"/>;
    }

    return (
      <div className={"col-md-5 key-feature clearfix " + this.props.additionalClasses}>
        <div className="col-xs-2">
          {icon}
        </div>
        <div className="col-xs-10">
          <h3 className="key-feature__headline">
            {data.title}
          </h3>
          <p className="key-feature__description">
            {data.text}
          </p>
          <a href={data.button.url} target={data.button.target ? data.button.target : null} className="btn btn-primary">{data.button.text}</a>
        </div>
      </div>
    );
  }
})

var PeopleCardModule = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <div className="col-lg-4 col-md-6 col-sm-6 profile-card clearfix"><div className="profile-card__innerDiv clearfix">
          <div className="col-xs-4 profile-card__image">
            <img src={data.picture} alt className="img-responsive" />
          </div>
          <div className="col-xs-8 profile-card__text profile-card__name-container">
            <p className="profile-card__name">
              <a target="_blank" href={data.url}>{data.title}</a>
            </p>
            <p className="profile-card__description">
              {data.text}
            </p>
          </div>
        </div>
      </div>
    );
  }
});

var RegisterCardModule = React.createClass({
  render: function() {
    var data = this.props.data;

    return (
      <div className="col-lg-4 col-md-6 col-sm-6 register-card clearfix"><div className="register-card__innerDiv clearfix">
          <div style={{textAlign: 'center'}}>
            <p className="register-card__text">{data.text}</p>
            <a href={data.url} className="btn btn-primary">
              <span className="glyphicon glyphicon-menu-right" aria-hidden="true" />{data.buttonText}
            </a>
          </div>
        </div>
      </div>
    );
  }
});


var InputFieldsList = React.createClass({

  render: function () {

    var inputFields = this.props.fields.map(function (field, index) {
      return (<InputFieldModule data={field} key={index} />);
    });

    return (
      <div>
        {inputFields}
      </div>
    );
  }
});

var InputFieldGroups = React.createClass({

  getInitialState: function() {
    return ({selectedGroup: 0});
  },

  onGroupSelectorClick: function(index) {
    this.setState({selectedGroup: index});
  },

  render: function() {
    var groups = this.props.groups;

    if (!groups.name) {
      return <InputFieldsList fields={groups} />
    }

    var groupSelectors = groups.map(function(element, index){
      var classes = "group-selector";
      if (this.state.selectedGroup == index) {
        classes += " group-selector--active";
      }

      return (
        <div key={index} className={classes} onClick={() => this.onGroupSelectorClick(index)}>{element.name}</div>
      );
    }.bind(this));

    return (
      <div>
        <div>{groupSelectors}</div>
        <InputFieldsList fields={groups[this.state.selectedGroup].fields} />
      </div>
    );
  }
})

var TitleWithRegisterForm = React.createClass({
  render: function() {

    // save the data in own variable for easier access
    var data = this.props.data;


    return (
      <section
        className="slide slide--with-background slide--title"
        style={{
          backgroundImage: 'url('+data.pictures.background.src+')',
          backgroundAttachment: 'scroll',
          backgroundPositionX: data.pictures.background.positionX,
          backgroundPositionY: data.pictures.background.positionY,

        }}>
        <div className="slide--with-background__inner-div">
          <div className="container">
            <div className="row">
              <div className="col-md-5 slide__title-introduction">
                <h1><span className="slide__white-negative-text">{data.contents.title}</span></h1>
                <div className="slide--with-background__text">
                  <p>{data.contents.text}</p>
                </div>
                <IfNotNullModule check={[data.pictures.motiv.src] }>
                  <img src={data.pictures.motiv.src} alt="motiv" className="slide__motiv-picture" />
                </IfNotNullModule>
              </div>
              <div className="col-md-5 col-md-offset-2">
                <form id="register-form" className="register-form register-form--slide">
                  <p className="register-form__intro-text text-center">{data.contents.formTitle}</p>

                  <InputFieldGroups groups={data.inputFields} />

                  <p className="register-form__info-text">{data.contents.buttonAdditionalText}</p>
                  <button type="submit" className="btn btn-primary btn-block">{data.contents.buttonText}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

var KeyFeatures = React.createClass({
  render: function () {
    var data = this.props.data;

    var rows = [];

    for (var i = 0; i < data.features.length; i=i+2) {
      rows.push(
        <div className="row" key={i} >
          <KeyFeatureModule data={data.features[i]} additionalClasses="col-md-offset-1" />
          <KeyFeatureModule data={data.features[i+1]} />
        </div>
      );
    }

    return (
      <section className="slide slide--key-features">
        <div className="container">
          {rows}
        </div>
      </section>
    );
  }
});

var SlideStatement = React.createClass({
  render: function() {

    var data = this.props.data;

    return (
      <section
        className="slide slide--with-background slide--statement"
        style={{
          backgroundImage: "url("+data.background.src+")",
          backgroundPositionX: data.background.positionX,
          backgroundPositionY: data.background.positionY
        }}
      >
        <div className="slide--with-background__inner-div" style={{minHeight: 700}}>
          <div className="container">
            <div className="row">
              <div className="col-sm-8 slide__statement">
                <h1><span className="slide__white-negative-text">{data.title}</span></h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

var People = React.createClass({
  render: function() {

    var data = this.props.data;

    var peopleCards = data.cards.map(function(card, index) {
      switch (card.type) {

        case "people":
          return <PeopleCardModule data={card} key={index} />;

        case "register":
          return <RegisterCardModule data={card} key={index} />;

        default:
          console.error('Unknown People Card Type: \''+card.type+'\'. Card Data:');
          console.error(card);

      }
    });
    return (
      <section className="slide slide--people">
        <div className="container">
          <div className="row">
            {peopleCards}
          </div>
        </div>
      </section>
    );
  }
})

var LandingPageApp = React.createClass({
  render: function() {

    var modules = this.props.data.map(function (module, index) {
      switch (module.module) {

        case "TitleWithRegisterForm":
          return (<TitleWithRegisterForm data={module} key={index} />);

        case "KeyFeatures":
          return (<KeyFeatures data={module} key={index} />);

        case "SlideStatement":
          return (<SlideStatement data={module} key={index} />);

        case "People":
          return (<People data={module} key={index} />);


        default:
          console.error('Unknown module "' + module.module + '". Data: ');
          console.error(module);
      }
    });

    return (
      <div>
        {modules}
      </div>
    );
  }
});

ReactDOM.render(
  <LandingPageApp data={contentLandingPage} />,
  document.getElementById('react-app-landing-page')
);
