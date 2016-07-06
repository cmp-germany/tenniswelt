var ProfileHeader = React.createClass({
  render: function() {
    return (
      <header className="profile-header">
        <img className="profile-header__wallpaper" src={this.props.profileData.wallpaper} alt={"Wallpaper von " + this.props.profileData.name} />
        <div className="profile-header__desc-bar">
          <div className="col-xs-2 profile-header__profile-picture-container">
            <img src={this.props.profileData.profileImage} alt={"Profilbild von " + this.props.profileData.name} className="profile-header__profile-picture img-responsive" />
          </div>
          <div className="col-xs-7">
            <h3 className="profile-header__name">{this.props.profileData.name}</h3>
          </div>
          <div className="col-xs-3">
            <ul className="profile-header__action-buttons text-right">
              <li className="profile-header__action-button profile-header__action-button--online-status"><i className="material-icons"></i></li>
              <li className="profile-header__action-button"><i className="material-icons"></i></li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
})

var ProfileCompanyInfo = React.createClass({
  render: function() {
    return (
      <div className="profile-infos">
        <h3 className="profile-infos__title">Unternehmensinfos</h3>
        <form className="form-horizontal profile-infos__form--read">
          <div className="form-group">
            <div className="col-sm-9 col-sm-offset-3">
              <p className="profile-infos__read profile-infos__desc">{this.props.companyInfo.desc}</p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company-name" className="col-sm-3 control-label profile-infos__label">Name des Unternehmens</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.companyInfo.name}</p>
              <input type="text" className="form-control profile-infos__input" id="company-name" placeholder={this.props.companyInfo.name} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company-branche" className="col-sm-3 control-label profile-infos__label">Unternehmen</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.companyInfo.branche}</p>
              <input type="text" className="form-control profile-infos__input" id="company-branche" placeholder="{this.props.companyInfo.branche}" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company-main-location" className="col-sm-3 control-label profile-infos__label">Hauptsitz</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.companyInfo.mainLocation}</p>
              <input type="text" className="form-control profile-infos__input" id="company-main-location" placeholder="{this.props.companyInfo.mainLocation}" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company-country" className="col-sm-3 control-label profile-infos__label">Land</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.companyInfo.country}</p>
              <input type="text" className="form-control profile-infos__input" id="company-country" placeholder="{this.props.companyInfo.country}" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company-email" className="col-sm-3 control-label profile-infos__label">E-Mail</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.companyInfo.email}</p>
              <input type="text" className="form-control profile-infos__input" id="company-email" placeholder="{this.props.companyInfo.email}" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company-tel" className="col-sm-3 control-label profile-infos__label">Telefon</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.companyInfo.tel}</p>
              <input type="text" className="form-control profile-infos__input" id="company-tel" placeholder="{this.props.companyInfo.tel}" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company-category" className="col-sm-3 control-label profile-infos__label">Kategorie</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.companyInfo.category}</p>
              <input type="text" className="form-control profile-infos__input" id="company-category" placeholder="{this.props.companyInfo.category}" />
            </div>
          </div>
        </form>
      </div>
    );
  }
})

var ProfileMap = React.createClass({
  render: function() {
    return (
      <div className="profile-infos">
        <h3 className="profile-infos__title">Karte</h3>
        <div className="profile-infos__map embed-responsive embed-responsive-4by3">
          <iframe src={this.props.mapData.src} width={800} height={600} frameBorder={0} style={{border: 0}} allowFullScreen />
        </div>
      </div>
    );
  }
})

var ProfileInfo = React.createClass({
  render: function() {
    var keywords;
    for (var i = 0; i < this.props.profileData.keywords.length; i++) {
      if (i==0) {
        keywords = this.props.profileData.keywords[i];
      } else {
        keywords += ", " + this.props.profileData.keywords[i];
      }
    }
    return (
      <div className="profile-infos">
        <h3 className="profile-infos__title">Über uns</h3>
        <form className="form-horizontal profile-infos__form--read">
          <div className="form-group">
            <label htmlFor="about-us-adress" className="col-sm-3 control-label profile-infos__label">Adresse</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.profileData.street}</p>
              <input type="text" className="form-control profile-infos__input" id="about-us-adress" placeholder="{this.props.profileData.street}" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="about-us-zip" className="col-sm-3 control-label profile-infos__label">Postleitzahl</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.profileData.zip}</p>
              <input type="text" className="form-control profile-infos__input" id="about-us-zip" placeholder={this.props.profileData.zip} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="about-us-city" className="col-sm-3 control-label profile-infos__label">Stadt</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.profileData.city}</p>
              <input type="text" className="form-control profile-infos__input" id="about-us-city" placeholder="{this.props.profileData.city}" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="about-us-website" className="col-sm-3 control-label profile-infos__label">Website</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.profileData.website}</p>
              <input type="text" className="form-control profile-infos__input" id="about-us-website" placeholder="{this.props.profileData.website}" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="about-us-timezone" className="col-sm-3 control-label profile-infos__label">Zeitzone</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.profileData.timezone}</p>
              <input type="text" className="form-control profile-infos__input" id="about-us-timezone" placeholder="{this.props.profileData.timezone}" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="about-us-keywords" className="col-sm-3 control-label profile-infos__label">Suchwörter</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{keywords}</p>
              <input type="text" className="form-control profile-infos__input" id="about-us-keywords" placeholder="{keywords}" />
            </div>
          </div>
        </form>
      </div>
    );
  }
})

var ProfileAbout = React.createClass({
  render: function() {
    return (
      <div>
        <ProfileHeader profileData={this.props.profileData} />
        <ul className="profile-tabs">
          <li className="profile-tabs__tab profile-tabs__tab--active"><a href="#">Über</a></li>
          <li className="profile-tabs__tab"><a href="#">Wall</a></li>
          <li className="profile-tabs__tab"><a href="#">Kontakte</a></li>
          <li className="profile-tabs__tab"><a href="#">Fotos</a></li>
        </ul>
        <ProfileCompanyInfo companyInfo={this.props.profileData.companyInfo} />
        <ProfileMap mapData={this.props.profileData.mapData} />
        <ProfileInfo profileData={this.props.profileData} />
      </div>
    );
  }
});

ReactDOM.render(
  <ProfileAbout profileData={profileData} />,
  document.getElementById('profile-about')
);
