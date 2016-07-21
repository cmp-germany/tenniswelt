var content = {
  startup : {
    searchTitle : "Startup",
    resultPersonen : [],
    resultUnternehmen : [
      {
        name : 'RheinFeiern GmbH',
        bild : 'gfx/profilbild.png',
        onlineStatus : false,
        profil : '#'
      },
      {
        name : 'Comstart Reuter',
        bild : 'gfx/profilbild.png',
        onlineStatus : false,
        profil : '#'
      },
      {
        name : 'NetCologne',
        bild : 'gfx/profilbild.png',
        onlineStatus : false,
        profil : '#'
      },
      {
        name : 'Gesellschaft für kommunalen Einkauf mbH',
        bild : 'gfx/profilbild.png',
        onlineStatus : true,
        profil : '#'
      }
    ],
    resultGruppen : []
  },

  privateInvestoren : {
    searchTitle : "Private Investoren",
    resultPersonen : [],
    resultUnternehmen : [
      {
        name : 'ijoijoij',
        bild : 'gfx/profilbild.png',
        onlineStatus : false,
        profil : '#'
      }
    ],
    resultGruppen : []
  },

  institutionelleInvestoren : {
    searchTitle : "Institutionelle Investoren",
    resultPersonen : [],
    resultUnternehmen : [],
    resultGruppen : []
  },

  institutionelleFoerderungen : {
    searchTitle : "Institutionelle Förderungen",
    resultPersonen : [],
    resultUnternehmen : [],
    resultGruppen : []
  },

  privatwirtschaftlicheFoerderung : {
    searchTitle : "Privatwirtschaftliche Förderungen",
    resultPersonen : [],
    resultUnternehmen : [],
    resultGruppen : []
  },

  staatlicheFoederungen : {
    searchTitle : "Staatliche Förderung",
    resultPersonen : [],
    resultUnternehmen : [],
    resultGruppen : []
  },

  gruenderzentrum : {
    searchTitle : "Gründerzentrum",
    resultPersonen : [],
    resultUnternehmen : [],
    resultGruppen : []
  },

  businessAngels : {
    searchTitle : "Business Angels",
    resultPersonen : [],
    resultUnternehmen : [],
    resultGruppen : []
  },

  dienstleister : {
    searchTitle : "Dienstleister",
    resultPersonen : [],
    resultUnternehmen : [
      {
        name : 'DNTRUST GmbH',
        bild : 'gfx/profilbild.png',
        onlineStatus : false,
        profil : '#'
      },
      {
        name : 'NetCologne',
        bild : 'gfx/profilbild.png',
        onlineStatus : false,
        profil : '#'
      },
      {
        name : 'Hair & More',
        bild : 'gfx/profilbild.png',
        onlineStatus : false,
        profil : '#'
      },
      {
        name : 'Info.Koeln',
        bild : 'gfx/profilbild.png',
        onlineStatus : false,
        profil : '#'
      },
      {
        name : 'dotkoeln',
        bild : 'gfx/profilbild.png',
        onlineStatus : false,
        profil : '#'
      },
      {
        name : 'Industrie und Handelskammer zu Köln',
        bild : 'gfx/profilbild.png',
        onlineStatus : false,
        profil : '#'
      },
      {
        name : 'Railslove',
        bild : 'gfx/profilbild.png',
        onlineStatus : false,
        profil : '#'
      },
      {
        name : 'Cross Media Production Germany Ltd.',
        bild : 'gfx/profilbild.png',
        onlineStatus : false,
        profil : '#'
      }
    ],
    resultGruppen : []
  },

  einkaeufer : {
    searchTitle : "Einkäufer",
    resultPersonen : [],
    resultUnternehmen : [],
    resultGruppen : []
  },

  co_workingSpaces : {
    searchTitle : "CO-Working Spaces",
    resultPersonen : [],
    resultUnternehmen : [],
    resultGruppen : []
  }
};



$( document ).ready(function(){
  var querySuche = $.urlParam('suche');
  var queryIndex = $.urlParam('index');
  var personenAnzahl = content[querySuche].resultPersonen.length;
  var unternehmenAnzahl = content[querySuche].resultUnternehmen.length;
  var gruppenAnzahl = content[querySuche].resultGruppen.length;

console.log(queryIndex);

  $( "#page-navigation__personen" ).append('<a href="?index=personen&suche='+querySuche+'">Personen ('+personenAnzahl+')</a>');
  $( "#page-navigation__gruppen" ).append('<a href="?index=gruppen&suche='+querySuche+'">Gruppen ('+gruppenAnzahl+')</a>');
  $( "#page-navigation__unternehmen" ).append('<a href="?index=unternehmen&suche='+querySuche+'">Unternehmen ('+unternehmenAnzahl+')</a>');

  if (queryIndex == "unternehmen") {
    $( "#search-result__search-title" ).append('Unternehmenssuche: "'+content[querySuche].searchTitle+'"');
    postResults(content[querySuche].resultUnternehmen);
  }
  if (queryIndex == "personen") {
    $( "#search-result__search-title" ).append('Personensuche: "'+content[querySuche].searchTitle+'"');
    postResults(content[querySuche].resultPersonen);
  }
  if (queryIndex == "gruppen") {
    $( "#search-result__search-title" ).append('Gruppensuche: "'+content[querySuche].searchTitle+'"');
    postResults(content[querySuche].resultGruppen);
  }

});

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
};

function postResults(type) {
  var result = type;
  var onlineClass ="";

  for(var i=0; i<result.length; i++) {
    if (result[i].onlineStatus === true) onlineClass = "online-status--online";
    else onlineClass = "";

    var innerHTML =
    '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">'+
      '<div class="kontakt-card">'+
        '<a href="profile-about.html?userId=volker-miller">'+
          '<img class="kontakt-card__thumbnail" src="'+result[i].bild+'" alt="Thumbnail" />'+
        '</a>'+
        '<div class="kontakt-card__name">'+
          '<a href="'+result[i].profil+'">'+result[i].name+'</a>'+
        '</div>' +
        '<ul class="kontakt-card__actions">'+
          '<li><i class="material-icons '+onlineClass+' ">&#xE837;</i></li>'+
          '<li><i style="cursor: pointer;" onClick="reactChatApp.addChat("volker-miller");" class="material-icons">&#xE0C9;</i></li>'+
        '</ul>'+
      '</div>'+
    '</div>';
    $( "#resultContainer" ).append( innerHTML );
  }

  if(result.length===0) $( "#resultContainer" ).append("Kein Resultat vorhanden.");
}
