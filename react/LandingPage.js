var contentLandingPage = [
  { module: "TitleWithRegisterForm",
    contents: {
      title: "Treten Sie jetzt mit der Kölner Gründerszene in Kontakt!",
      text:
        "Werden Sie Teil der Startup Szene und treten Sie einem internationalem Portal bei. Hier finden Sie alle Möglichkeiten, die Sie für Ihr aufstrebendes Unternehmen brauchen: Kommunizieren Sie mit Gleichgesinnten, tauschen Sie Ihr Wissen aus, finden Sie Ihre Kunden und entdecken Sie die Finanzierungsmöglichkeiten, die Ihrer Geschäftsidee den nötigen Boost verleihen.",
      formTitle: "Kostenlos registrieren und ein Jahr unverbindlich testen.",
      buttonAdditionalText: 'Per Klick auf "Jetzt Mitglied werden" stimmen Sie unseren AGB und Datenschutzrichtlinien zu.',
      buttonText: "Jetzt Mitglied werden"
    },
    pictures: {
      background: {
        src: "gfx/landing-hintergrund.jpg",
        positionX: "100%",
        positionY: "50%"
      },
      motiv: {
        src: "gfx/flieger-junge.png"
      }
    },
    inputFields: [
      {
        inputType: "text",
        label: "Name des Unternehmens"
      },
      {
        inputType: "select",
        options: [
          "Kategorie 1",
          "Kategorie 2",
          "Kategorie 3",
          "Kategorie 4"
        ]
      },
      {
        inputType: "select",
        options: [
          "Branche 1",
          "Branche 2",
          "Branche 3",
          "Branche 4"
        ]
      },
      {
        inputType: "text",
        label: "Benutzername"
      },
      {
        inputType: "email",
        label: "E-Mail Adresse"
      },
      {
        inputType: "password",
        label: "Passwort vergeben"
      },
      {
        inputType: "password",
        label: "Passwort wiederholen"
      }
    ]
  },
  { module: "KeyFeatures",
    features: [
      {
        title: "Firmenprofil anlegen",
        text: "Zeigen Sie, was Sie unverwechselbar macht. Legen Sie ein Firmenprofil an, das Ihre Angebote und Leistungen beschreibt und stellen Sie sich und Ihre Mitarbeiter den anderen Plattformmitgliedern vor.",
        icon: "business",
        button: {
          text: "Jetzt registrieren",
          url: "#register-form"
        }
      },
      {
        title: "Zielgruppe finden",
        text: "Schlagwortsuche, Active Matching und Gruppen der Plattform helfen Ihnen, zu Ihren konkreten Anliegen die richtigen Ansprechpartner auf der Plattform zu finden.",
        icon: "group",
        button: {
          text: "Jetzt registrieren",
          url: "#register-form"
        }
      }
    ]
  },
  { module: "SlideStatement",
    title: "Wir vernetzen Know-how. Schnell, sicher, erfolgreich.",
    background: {
      src: "gfx/fotolia_110376588.jpg",
      positionX: "90%",
      positionY: "50%"
    }
  },
  { module: "People",
    cards: [
      {
        type: "people",
        title: "Köln: Top Lage, perfekte Logistik",
        text: "Köln liegt als viertgrößte Stadt Deutschlands optimal erreichbar im Zentrum eines enormen Absatzmarktes: In einem Radius von nur 100km leben rund 17 Millionen Menschen.",
        url: "http://startupregion.koeln/infrastructure.html",
        picture: "gfx/landing-page/fotolia_82266608.jpg"
      },
      {
        type: "people",
        title: "Stadt Köln",
        text: "Für den Erfolg sind nicht nur wirtschaftliche Faktoren wichtig: das ganze Umfeld muss passen. Wie in Köln, der Weltstadt mit Tempo und Herz.",
        url: "http://www.stadt.koeln/",
        picture: "gfx/landing-page/fotolia_93025626.jpg"
      },
      {
        type: "people",
        title: "Köln und Industrie",
        text: "Die produktive Mischung aus großen, mittleren und kleinen heimischen und ausländischen Unterneh­men zeigt das große Potential der Wirtschaftsregion Köln.",
        url: "http://startupregion.koeln/industry.html",
        picture: "gfx/landing-page/fotolia_71453007.jpg"
      },
      {
        type: "people",
        title: "NetCologne - Digitales Köln",
        text: "Nicht nur die Versorgung mit schnellem Internet im Büro, sondern auch die Möglichkeit mobil sein Business optimal zu führen sind essentiell. Kölns TK-Anbieter NetCologne bietet beides.",
        url: "https://www.netcologne.de/geschaeftskunden",
        picture: "gfx/landing-page/logo-netcologne.png"
      },
      {
        type: "people",
        title: "IHK Köln - Starker Partner für Startups",
        text: "Ob Existenzgründung, Unternehmenswachstum oder Unternehmensnachfolger: Die IHK Köln berät, hilft und informiert.",
        url: "https://www.ihk-koeln.de/Existenzgruendung.AxCMS?ActiveID=1671",
        picture: "gfx/landing-page/ihk-k.png"
      },
      {
        type: "register",
        text: "Kostenlos registrieren und ein Jahr unverbindlich testen.",
        buttonText: "Jetzt registrieren",
        url: "#register-form"
      }
    ]
  },
  { module: "SlideStatement",
    title: "Vernetzen Sie sich mit dem Erfolg.",
    background: {
      src: "gfx/Fotolia_101170696_L-1920.jpg",
      positionX: "55%",
      positionY: "50%"
    }
  }
];

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

    return (
      <div className={"col-md-5 key-feature clearfix " + this.props.additionalClasses}>
        <div className="col-xs-2">
          <i className="material-icons key-feature__icon text-center">{data.icon}</i>
        </div>
        <div className="col-xs-10">
          <h3 className="key-feature__headline">
            {data.title}
          </h3>
          <p className="key-feature__description">
            {data.text}
          </p>
          <a href={data.button.url} className="btn btn-important">{data.button.text}</a>
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
    console.log(data);

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

var TitleWithRegisterForm = React.createClass({
  render: function() {

    // save the data in own variable for easier access
    var data = this.props.data;


    return (
      <section className="slide slide--with-background slide--title">
        <div className="slide--with-background__inner-div">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 slide__title-introduction">
                <h1><span className="slide__white-negative-text">{data.contents.title}</span></h1>
                <div className="slide--with-background__text">
                  <p>{data.contents.text}</p>
                </div>
                <IfNotNullModule check={[data.pictures.motiv.src] }>
                  <img src={data.pictures.motiv.src} alt="motiv" className="visible-lg-block visible-md-block visible-sm-block img-responsive" style={{marginBottom: '-90px'}} />
                  <img src={data.pictures.motiv.src} alt="motiv" className="visible-xs-block img-responsive" style={{ maxWidth: 250, marginLeft: 'auto', marginRight: 'auto', marginBottom: '-40px' }} />
                </IfNotNullModule>
              </div>
              <div className="col-sm-6 col-sm-offset-1">
                <form id="register-form" className="register-form register-form--slide">
                  <p className="register-form__intro-text text-center">{data.contents.formTitle}</p>

                  <InputFieldsList fields={data.inputFields} />

                  <p className="register-form__info-text">{data.contents.buttonAdditionalText}</p>
                  <button type="submit" className="btn btn-important btn-block">{data.contents.buttonText}</button>
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
