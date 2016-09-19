var ProfileHeader = React.createClass({
  render: function() {
    var onlineIconClasses;
    if (this.props.profileData.isOnline) {
      onlineIconClasses = "profile-header__action-button profile-header__action-button--is-online";
    } else {
      onlineIconClasses = "profile-header__action-button";
    }


    return (
      <header className="profile-header">
        <div
          className="profile-header__wallpaper"
          style={{backgroundImage: "url(" + this.props.profileData.wallpaper  + ")"}}
          alt={"Wallpaper von " + this.props.profileData.name} />
        <div className="profile-header__desc-bar">
          <div className="profile-header__profile-picture-container">
            <img
              src={this.props.profileData.profileImage}
              alt={"Profilbild von " + this.props.profileData.name}
              className="profile-header__profile-picture img-responsive" />
          </div>
          <div className="profile-header__profile-name-container">
            <div style={{display: 'table', height: 100}}>
              <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
                <h3 className="profile-header__name">
                  {this.props.profileData.name}
                </h3>
              </div>
            </div>
          </div>
          <div className="profile-header__profile-buttons-container">
            <div style={{display: 'table', height: 100}}>
              <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
                <ul className="profile-header__action-buttons text-right">
                  <li className={onlineIconClasses}>
                    <i className="material-icons"></i>
                  </li>
                  <li className="profile-header__action-button">
                    <a
                      href={"javascript:reactChatApp.addChat('" + this.props.profileData.id + "');"}
                      style={{
                        color: "inherit"
                      }}
                      >
                      <i className="material-icons"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
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
              <input type="text" className="form-control profile-infos__input" id="company-branche" placeholder={this.props.companyInfo.branche} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company-main-location" className="col-sm-3 control-label profile-infos__label">Hauptsitz</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.companyInfo.mainLocation}</p>
              <input type="text" className="form-control profile-infos__input" id="company-main-location" placeholder={this.props.companyInfo.mainLocation} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company-country" className="col-sm-3 control-label profile-infos__label">Land</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.companyInfo.country}</p>
              <input type="text" className="form-control profile-infos__input" id="company-country" placeholder={this.props.companyInfo.country} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company-email" className="col-sm-3 control-label profile-infos__label">E-Mail</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.companyInfo.email}</p>
              <input type="text" className="form-control profile-infos__input" id="company-email" placeholder={this.props.companyInfo.email} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company-tel" className="col-sm-3 control-label profile-infos__label">Telefon</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.companyInfo.tel}</p>
              <input type="text" className="form-control profile-infos__input" id="company-tel" placeholder={this.props.companyInfo.tel} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="company-category" className="col-sm-3 control-label profile-infos__label">Kategorie</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.companyInfo.category}</p>
              <input type="text" className="form-control profile-infos__input" id="company-category" placeholder={this.props.companyInfo.category} />
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
    if (this.props.profileData.keywords) {
      for (var i = 0; i < this.props.profileData.keywords.length; i++) {
        if (i==0) {
          keywords = this.props.profileData.keywords[i];
        } else {
          keywords += ", " + this.props.profileData.keywords[i];
        }
      }
    }

    var keywordsDiv;
    if (this.props.profileData.keywords) {
      keywordsDiv = (
        <div className="form-group">
          <label htmlFor="about-us-keywords" className="col-sm-3 control-label profile-infos__label">Suchwörter</label>
          <div className="col-sm-9">
            <p className="profile-infos__read">{keywords}</p>
            <input type="text" className="form-control profile-infos__input" id="about-us-keywords" placeholder={keywords} />
          </div>
        </div>
      )
    }

    var title;
    if (this.props.profileData.isCompanyProfile) {
      title = "Über uns";
    } else {
      title = "Über mich";
    }

    return (
      <div className="profile-infos">
        <h3 className="profile-infos__title">{title}</h3>
        <form className="form-horizontal profile-infos__form--read">
          <div className="form-group">
            <label htmlFor="about-us-adress" className="col-sm-3 control-label profile-infos__label">Adresse</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.profileData.street}</p>
              <input type="text" className="form-control profile-infos__input" id="about-us-adress" placeholder={this.props.profileData.street} />
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
              <input type="text" className="form-control profile-infos__input" id="about-us-city" placeholder={this.props.profileData.city} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="about-us-website" className="col-sm-3 control-label profile-infos__label">Website</label>
            <div className="col-sm-9">
              <p className="profile-infos__read"><a href={this.props.profileData.website}>{this.props.profileData.website}</a></p>
              <input type="text" className="form-control profile-infos__input" id="about-us-website" placeholder={this.props.profileData.website} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="about-us-timezone" className="col-sm-3 control-label profile-infos__label">Zeitzone</label>
            <div className="col-sm-9">
              <p className="profile-infos__read">{this.props.profileData.timezone}</p>
              <input type="text" className="form-control profile-infos__input" id="about-us-timezone" placeholder={this.props.profileData.timezone} />
            </div>
          </div>
          {keywordsDiv}
        </form>
      </div>
    );
  }
})

var Module = React.createClass({

  componentDidMount: function() {
    $.get({
      url: './modules/' + this.props.file,
      success: function(data) {
        $(this.divContainer).append(data);
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div
        className="hidden-md hidden-lg"
        ref={
          function (divContainer){
            this.divContainer = divContainer;
          }.bind(this)
        }
      />
    )
  }
});

var Member = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <div className="MembersItem">
        <div className="MembersAvatar">
          <a href={'profile-about.html?userId='+data.id}>
            <img
              className="avatar"
              src={data.picture}
              title={data.name}
              alt={data.name}
            />
          </a>
        </div>
        <div className="MembersName">
          <a href={'profile-about.html?userId='+data.id}>
            {data.name}
          </a>
        </div>
        <div className="MembersPosition">
          <span>
            {data.position}
          </span>
        </div>
        <div className="MembersEmail">
          <a href={"mailto:"+data.email}>{data.email}</a>
        </div>
        <div className="MembersPhone">
          <span>{data.tel}</span>
        </div>
        <div className="MembersContact">
          <span title="Euroglas Verpackungs GmbH ist offline" className="ChatStatusIcon CompanyMembersChatStatusIcon UserMediaOfflineIcon"></span>
          <ul>
            <li>
              <a
                href={'javascript:reactChatApp.addChat("'+data.id+'");'}
                title={"Mit "+data.name+" chatten"}
                className="ChatIcon CompanyMembersChatIcon"
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

var CompanyMembers = React.createClass({

  render: function() {

    var members = this.props.members.map(function(member, index){
      return (
        <Member data={member} key={index} />
      )
    });

    return (
      <div className="profile-infos">
        <h3 className="profile-infos__title">Firmenmitarbeiter</h3>
        <div className="profile-infos__members">
          {members}
        </div>
      </div>
    );
  }
})

var ProfileAbout = React.createClass({
  render: function() {

    var profileCompanyInfo;
    if (this.props.profileData.isCompanyProfile) {
      profileCompanyInfo = <ProfileCompanyInfo companyInfo={this.props.profileData.companyInfo} />
    };

    var profileMap;
    if (this.props.profileData.mapData) {
      profileMap = <ProfileMap mapData={this.props.profileData.mapData} />
    }

    var companyMembers;
    if (this.props.profileData.members) {
      companyMembers = <CompanyMembers members={this.props.profileData.members} />
    }


    return (
      <div>
        <ProfileHeader profileData={this.props.profileData} />
        <Module file="kontakt-hinzufuegen.html" />
        <ul className="profile-tabs">
          <li className="profile-tabs__tab profile-tabs__tab--active"><a href="#1">Über</a></li>
          <li className="profile-tabs__tab"><a href="#1">Wall</a></li>
          <li className="profile-tabs__tab"><a href="#1">Kontakte</a></li>
          <li className="profile-tabs__tab"><a href="#1">Fotos</a></li>
        </ul>
        {profileCompanyInfo}
        {profileMap}
        <ProfileInfo profileData={this.props.profileData} />
        {companyMembers}
      </div>
    );
  }
});

ReactDOM.render(
  <ProfileAbout profileData={profileData} />,
  document.getElementById('profile-about')
);
