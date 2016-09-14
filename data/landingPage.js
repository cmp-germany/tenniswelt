window.contentLandingPage = [
  { module: "TitleWithRegisterForm",
    contents: {
      title: "Treten Sie jetzt der neuen Tenniswelt Community bei!",
      text:
        "Das neue Tenniswelt Portal (Powered by Marc Kevin Göllner) bietet Ihnen ein soziales Netzwerk für Ihre persönliche Tenniswelt. Egal, ob Sie auf der Suche nach Talenten oder nach Sponsoren sind, Sie die aktuellsten Ergebnisse der letzten Meisterschaft sehen möchten oder einfach nur mit Ihren Sportkollegen in Verbindung bleiben wollen: Hier sind Sie richtig.",
      formTitle: "Kostenlos registrieren und ein Jahr unverbindlich testen.",
      buttonAdditionalText: 'Per Klick auf "Jetzt Mitglied werden" stimmen Sie unseren AGB und Datenschutzrichtlinien zu.',
      buttonText: "Jetzt Mitglied werden"
    },
    pictures: {
      background: {
        src: "gfx/landing-page/fotolia_95019069.jpg",
        positionX: "30%",
        positionY: "60%"
      },
      motiv: {
        //src: "gfx/flieger-junge.png"
      }
    },
    inputFields: [
      {
        inputType: "text",
        label: "Ihr Name"
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
        title: "Finden Sie neue Kontakte",
        text: "Sei es ein neuer Sponsor, oder die Suche nach neuen Talenten, seien es Ihre Sportkollegen oder das Profil des nächsten Kontrahenten: Auf dieser Plattform finden Sie alle wichtigen Kontakte rund um Ihre persönliche Tenniswelt.",
        icon: "person_add",
        button: {
          text: "Jetzt registrieren",
          url: "#register-form"
        }
      },
      {
        title: "Spiele und Ergebnisse",
        text: "Schauen Sie sich die Spielpläne und die Ergebnisse aller für Sie relevanten Spiele an. Brandaktuell und persönlich für Sie zugeschnitten.",
        icon: "style",
        button: {
          text: "Jetzt registrieren",
          url: "#register-form"
        }
      }
    ]
  },
  { module: "SlideStatement",
    title: "Wir vernetzen die Tenniswelt. Schnell, einfach, sympathisch.",
    background: {
      src: "gfx/landing-page/fotolia_89851114.jpg",
      positionX: "90%",
      positionY: "50%"
    }
  },
  { module: "People",
    cards: [
      {
        type: "people",
        title: "Marc-Kevin Goellner",
        text: "Marc-Kevin Goellner war als Tennisprofi 14 Jahre lang weltweit unterwegs. Sechs ATP-Tour-Titel konnte er hierbei einfahren.",
        url: "http://www.mkgoellner.de/coaches.html",
        picture: "gfx/profilbilder/marc-kevin-goellner.jpg"
      },
      {
        type: "people",
        title: "Syna Schreiber",
        text: "Syna Schreiber ist DTB-A-Lizenztrainerin und ehemalige Weltranglistenspielerin. Im Einzel hat es Syna bis auf Rang 108 geschafft, im Doppel war sie einst auf Rang 87 geführt. ",
        url: "http://www.mkgoellner.de/coaches.html",
        picture: "gfx/profilbilder/IMG_9119-klein.jpg"
      },
      {
        type: "people",
        title: "Niklas Bucht",
        text: "Er war finnischer Jugendmeister, die Nummer 4 in Finnlands Herrenrangliste und spielte professionell auf der ATP Tour.",
        url: "http://www.mkgoellner.de/coaches.html",
        picture: "gfx/profilbilder/coach-niklas.jpg"
      },
      {
        type: "people",
        title: "Janin Tesmer-Laß",
        text: "Janin Tesmer-Laß ist als Dipl.-Psychologin, Sportpsychologin & Hypno-Mentalcoach seit 1998 niedergelassen und seit früher Kindheit selbst aktive Wettkampf-Sportlerin.",
        url: "http://www.mkgoellner.de/coaches.html",
        picture: "gfx/profilbilder/mc-janin-tesmer-lass.jpg"
      },
      {
        type: "people",
        title: "Marc-Kevin Goellner Tennis-Akademie",
        text: "'BE PROFESSIONAL!' lautet das Motto der Marc-Kevin Goellner Tennis-Akademie. Dazu gehören jede Menge hochkarätige Partner, die den Jungprofi auf dem Weg nach oben unterstützen und begleiten. ",
        url: "http://www.mkgoellner.de/startseite.html",
        picture: "gfx/profilbilder/mkg-logo.jpg"
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
    title: "Vernetzen Sie sich mit ihrer persönlichen Tenniswelt.",
    background: {
      src: "gfx/landing-page/fotolia_119739557.jpg",
      positionX: "55%",
      positionY: "50%"
    }
  }
];
