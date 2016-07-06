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
        <div className="profile-infos">
          <h3 className="profile-infos__title">Unternehmensinfos</h3>
          <form className="form-horizontal profile-infos__form--read">
            <div className="form-group">
              <div className="col-sm-9 col-sm-offset-3">
                <p className="profile-infos__read profile-infos__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <input type="text" className="form-control profile-infos__input" id="company-name" placeholder="offering eprocurement for goverment and industrial partners" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="company-name" className="col-sm-3 control-label profile-infos__label">Name des Unternehmens</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">Gesellschaft für kommunalen Einkauf mbH</p>
                <input type="text" className="form-control profile-infos__input" id="company-name" placeholder="Gesellschaft für kommunalen Einkauf mbH" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="company-branche" className="col-sm-3 control-label profile-infos__label">Unternehmen</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">eprocurement</p>
                <input type="text" className="form-control profile-infos__input" id="company-branche" placeholder="eprocurement" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="company-main-location" className="col-sm-3 control-label profile-infos__label">Hauptsitz</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">Pulheim</p>
                <input type="text" className="form-control profile-infos__input" id="company-main-location" placeholder="Pulheim" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="company-country" className="col-sm-3 control-label profile-infos__label">Land</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">Deutschland</p>
                <input type="text" className="form-control profile-infos__input" id="company-country" placeholder="Deutschland" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="company-email" className="col-sm-3 control-label profile-infos__label">E-Mail</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">w.adams@gfke-eu</p>
                <input type="text" className="form-control profile-infos__input" id="company-email" placeholder="w.adams@gfke-eu" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="company-tel" className="col-sm-3 control-label profile-infos__label">Telefon</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">02238958590-37</p>
                <input type="text" className="form-control profile-infos__input" id="company-tel" placeholder="02238958590-37" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="company-category" className="col-sm-3 control-label profile-infos__label">Kategorie</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">Startup</p>
                <input type="text" className="form-control profile-infos__input" id="company-category" placeholder="Startup" />
              </div>
            </div>
          </form>
        </div>
        <div className="profile-infos">
          <h3 className="profile-infos__title">Karte</h3>
          <div className="profile-infos__map embed-responsive embed-responsive-4by3">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2511.601647372274!2d6.824141315273979!3d50.98655335647221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf3098c3c70c7b%3A0x4b8b986d52855bf5!2sAugust-Euler-Stra%C3%9Fe+3%2C+50259+Pulheim%2C+Deutschland!5e0!3m2!1sde!2sus!4v1467286780051" width={800} height={600} frameBorder={0} style={{border: 0}} allowFullScreen />
          </div>
        </div>
        <div className="profile-infos">
          <h3 className="profile-infos__title">Über uns</h3>
          <form className="form-horizontal profile-infos__form--read">
            <div className="form-group">
              <label htmlFor="about-us-adress" className="col-sm-3 control-label profile-infos__label">Adresse</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">August-Euler-Str. 3</p>
                <input type="text" className="form-control profile-infos__input" id="about-us-adress" placeholder="August-Euler-Str. 3" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="about-us-zip" className="col-sm-3 control-label profile-infos__label">Postleitzahl</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">50259</p>
                <input type="text" className="form-control profile-infos__input" id="about-us-zip" placeholder={50259} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="about-us-city" className="col-sm-3 control-label profile-infos__label">Stadt</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">Pulheim</p>
                <input type="text" className="form-control profile-infos__input" id="about-us-city" placeholder="Pulheim" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="about-us-website" className="col-sm-3 control-label profile-infos__label">Website</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">http://www.gfke.eu/</p>
                <input type="text" className="form-control profile-infos__input" id="about-us-website" placeholder="http://www.gfke.eu/" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="about-us-timezone" className="col-sm-3 control-label profile-infos__label">Zeitzone</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">UTC</p>
                <input type="text" className="form-control profile-infos__input" id="about-us-timezone" placeholder="UTC" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="about-us-keywords" className="col-sm-3 control-label profile-infos__label">Suchwörter</label>
              <div className="col-sm-9">
                <p className="profile-infos__read">Information Technology, Information Technology - Supplies</p>
                <input type="text" className="form-control profile-infos__input" id="about-us-keywords" placeholder="Information Technology, Information Technology - Supplies" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <ProfileAbout profileData={profileData} />,
  document.getElementById('profile-about')
);
