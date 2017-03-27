import React from 'react';


class NavbarMenuModule extends React.Component {

  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }

  render() {
    return (
      <ul className="nav navbar-nav navbar-right ">
        <li className="starters-navigation__list-item dropdown">
          <button className="nav-button dropdown-toggle" type="button" id="dropdown-stichwortsuche" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Stichwortsuche <span className="caret" />
          </button>
          <ul className="dropdown-menu dropdown-menu-left dropdown-menu--starters" aria-labelledby="dropdown-stichwortsuche">
            <li><a href="suche.html?index=unternehmen&suche=startup" className="dropdown-button--starters">Startups</a></li>
            <li><a href="suche.html?index=unternehmen&suche=privateInvestoren" className="dropdown-button--starters">Private Investoren</a></li>
            <li><a href="suche.html?index=unternehmen&suche=institutionelleInvestoren" className="dropdown-button--starters">Institutionelle Investoren</a></li>
            {/*Förderung*/}
            <li><p className="dropdown-button--starters dropdown-button--noeffect" type="button">Förderung</p>
              <ul className="multilevel-menu">
                <li><a href="suche.html?index=unternehmen&suche=institutionelleFoerderungen" className="dropdown-button--starters">Institutionelle Förderung</a></li>
                <li><a href="suche.html?index=unternehmen&suche=privatwirtschaftlicheFoerderung" className="dropdown-button--starters">Privatwirtschaftliche Förderung</a></li>
                <li><a href="suche.html?index=unternehmen&suche=staatlicheFoederungen" className="dropdown-button--starters">Staatliche Förderung</a></li>
              </ul>
            </li>
            <li><a href="suche.html?index=unternehmen&suche=gruenderzentrum" className="dropdown-button--starters">Gründerzentrum</a></li>
            <li><a href="suche.html?index=unternehmen&suche=businessAngels" className="dropdown-button--starters">Business Angels</a></li>
            <li><a href="suche.html?index=unternehmen&suche=dienstleister" className="dropdown-button--starters">Dienstleister</a></li>
            <li><a href="suche.html?index=unternehmen&suche=einkaeufer" className="dropdown-button--starters">Einkäufer</a></li>
            <li><a href="suche.html?index=unternehmen&suche=co_workingSpaces" className="dropdown-button--starters">Co-Working Spaces</a></li>
          </ul>
        </li>
        <li className="starters-navigation__list-item"><a href="#" className="nav-button">Startup-Leitfaden</a></li>
        <li className="starters-navigation__list-item"><a href="#" className="nav-button">Gruppen</a></li>
        <li className="starters-navigation__list-item"><a href="#" className="nav-button">Eventkalender</a></li>
        <li className="starters-navigation__list-item"><a href="#" className="nav-button">Suchen / Bieten</a></li>
      </ul>
    )
  }
}


export default NavbarMenuModule;
