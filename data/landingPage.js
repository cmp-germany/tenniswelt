window.contentLandingPage = [
  { module: 'TitleWithRegisterForm',
    contents: {
      title: "Treten Sie jetzt der neuen Tennis Community bei!",
      text:
        "Die neue Tennis Community (Powered by Marc-Kevin Goellner) bietet Ihnen ein soziales Netzwerk für Ihre persönliche Tenniswelt. Egal, ob Sie auf der Suche nach Talenten oder nach Sponsoren sind, Sie die aktuellsten Ergebnisse der letzten Meisterschaft sehen möchten oder einfach nur mit Ihren Sportkollegen in Verbindung bleiben wollen: Hier sind Sie richtig.",
      formTitle: "Kostenlose Registrierung für private Nutzer.",
      buttonAdditionalText: 'Per Klick auf "Jetzt Mitglied werden" stimmen Sie unseren AGB und Datenschutzrichtlinien zu.',
      buttonText: 'Jetzt Mitglied werden'
    },
    pictures: {
      background: {
        src: "gfx/landing-page/fotolia_95019069.jpg",
        positionX: "30%",
        positionY: "60%"
      },
      motiv: {
        src: "gfx/landing-page/powered-by-mkg.png"
      }
    },
    inputFields: [
      {
        name: 'Privat',
        fields: [
          {
            inputType: 'text',
            label: 'Vorname'
          },
          {
            inputType: 'text',
            label: 'Nachname'
          },
          {
            inputType: 'text',
            label: 'Benutzername'
          },
          {
            inputType: 'email',
            label: 'E-Mail'
          },
          {
            inputType: 'password',
            label: 'Passwort'
          },
          {
            inputType: 'password',
            label: 'Passwort wiederholen'
          }
        ]
      },
      {
        name: 'Unternehmen',
        fields: [
          {
            inputType: 'text',
            label: 'Name des Unternehmens'
          },
          {
            inputType: 'select',
            options: [
              'Kategorie 1',
              'Kategorie 2',
              'Kategorie 3',
              'Kategorie 4'
            ]
          },
          {
            inputType: 'select',
            options: [
              'Branche 1',
              'Branche 2',
              'Branche 3',
              'Branche 4'
            ]
          },
          {
            inputType: 'text',
            label: 'Benutzername'
          },
          {
            inputType: 'email',
            label: 'E-Mail Adresse'
          },
          {
            inputType: 'password',
            label: 'Passwort vergeben'
          },
          {
            inputType: 'password',
            label: 'Passwort wiederholen'
          }
        ]
      }
    ]
  },
  { module: 'KeyFeatures',
    features: [
      {
        title: "Finden Sie neue Kontakte",
        text: "Sei es ein neuer Sponsor, oder die Suche nach neuen Talenten, seien es Ihre Sportkollegen oder das Profil des nächsten Kontrahenten: Auf dieser Plattform finden Sie alle wichtigen Kontakte rund um Ihre persönliche Tenniswelt.",
        icon: "person_add",
        button: {
          text: 'Jetzt registrieren',
          url: '#register-form'
        }
      },
      {
        title: "Spiele und Ergebnisse",
        text: "Schauen Sie sich die Spielpläne und die Ergebnisse aller für Sie relevanten Spiele an. Brandaktuell und persönlich für Sie zugeschnitten.",
        icon: "style",
        button: {
          text: 'Jetzt registrieren',
          url: '#register-form'
        }
      }
    ]
  },
<<<<<<< HEAD
  { module: "SlideStatement",
    title: "Wir vernetzen die Tenniswelt. Schnell, einfach, sympathisch.",
    background: {
      src: "gfx/landing-page/fotolia_89851114.jpg",
      positionX: "90%",
      positionY: "50%"
    }
  },
  { module: "People",
    heading: "Finden Sie Ihren persönlichen Tennistrainer",
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
        text: "Kostenlose Registrierung für private Nutzer.",
        buttonText: "Jetzt registrieren",
        url: "#register-form"
      }
    ]
  },
  { module: "SlideStatement",
    title: "Vernetzen Sie sich mit Ihrer persönlichen Tenniswelt.",
    background: {
      src: "gfx/landing-page/fotolia_119739557.jpg",
      positionX: "55%",
      positionY: "50%"
=======
  { module: 'SlideStatement',
    title: 'Wir vernetzen Know-how. Schnell, sicher, erfolgreich.',
    background: {
      src: 'gfx/fotolia_110376588.jpg',
      positionX: '90%',
      positionY: '50%'
    }
  },
  { module: 'People',
    cards: [
      {
        type: 'people',
        title: 'Köln: Top Lage, perfekte Logistik',
        text: 'Köln liegt als viertgrößte Stadt Deutschlands optimal erreichbar im Zentrum eines enormen Absatzmarktes: In einem Radius von nur 100km leben rund 17 Millionen Menschen.',
        url: 'http://startupregion.koeln/infrastructure.html',
        picture: 'gfx/landing-page/fotolia_82266608.jpg'
      },
      {
        type: 'people',
        title: 'Stadt Köln',
        text: 'Für den Erfolg sind nicht nur wirtschaftliche Faktoren wichtig: das ganze Umfeld muss passen. Wie in Köln, der Weltstadt mit Tempo und Herz.',
        url: 'http://www.stadt.koeln/',
        picture: 'gfx/landing-page/fotolia_93025626.jpg'
      },
      {
        type: 'people',
        title: 'Köln und Industrie',
        text: 'Die produktive Mischung aus großen, mittleren und kleinen heimischen und ausländischen Unterneh­men zeigt das große Potential der Wirtschaftsregion Köln.',
        url: 'http://startupregion.koeln/industry.html',
        picture: 'gfx/landing-page/fotolia_71453007.jpg'
      },
      {
        type: 'people',
        title: 'NetCologne - Digitales Köln',
        text: 'Nicht nur die Versorgung mit schnellem Internet im Büro, sondern auch die Möglichkeit mobil sein Business optimal zu führen sind essentiell. Kölns TK-Anbieter NetCologne bietet beides.',
        url: 'https://www.netcologne.de/geschaeftskunden',
        picture: 'gfx/landing-page/logo-netcologne.png'
      },
      {
        type: 'people',
        title: 'IHK Köln - Starker Partner für Startups',
        text: 'Ob Existenzgründung, Unternehmenswachstum oder Unternehmensnachfolger: Die IHK Köln berät, hilft und informiert.',
        url: 'https://www.ihk-koeln.de/Existenzgruendung.AxCMS?ActiveID=1671',
        picture: 'gfx/landing-page/ihk-k.png'
      },
      {
        type: 'register',
        text: 'Kostenlos registrieren und ein Jahr unverbindlich testen.',
        buttonText: 'Jetzt registrieren',
        url: '#register-form'
      }
    ]
  },
  { module: 'SlideStatement',
    title: 'Vernetzen Sie sich mit dem Erfolg.',
    background: {
      src: 'gfx/Fotolia_101170696_L-1920.jpg',
      positionX: '55%',
      positionY: '50%'
>>>>>>> upstream/gh-pages
    }
  }
]
