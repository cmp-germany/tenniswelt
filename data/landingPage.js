window.contentLandingPage = [
  { module: "TitleWithRegisterForm",
    contents: {
      title: "Unsere Maßstäbe - Tradition und Innovation",
      text:
        "Die Tradition des Berufskollegs Deutzer Freiheit bei der Vorbereitung auf das kaufmännische Berufsleben, als dualer Partner in der Berufsausbildung oder bei der beruflichen Weiterbildung in der Fachschule ist verbunden mit einer Reihe von uns initiierter Innovationen. So waren wir eine der erstenberufsbildenden Schulen in NRW, die einen Teil des Unterrichts durch Auflösung der Stundentafel in Wahlpflicht-Kursen erteilten und Pilotschule in NRW zur Erprobung von Blockunterricht in der Berufsschule sowie Vorreiter bei bildungsgangübergreifenden Kooperationen und Neuerungen in der Berufsfachschule.",
      formTitle: "Kostenlos registrieren und ein Jahr unverbindlich testen.",
      buttonAdditionalText: 'Per Klick auf "Jetzt Mitglied werden" stimmen Sie unseren AGB und Datenschutzrichtlinien zu.',
      buttonText: "Jetzt Mitglied werden"
    },
    pictures: {
      background: {
        src: "http://source.unsplash.com/y83Je1OC6Wc/1920x1080",
        positionX: "50%",
        positionY: "50%"
      },
      motiv: {
        //src: "gfx/flieger-junge.png"
      }
    },
    inputFields: [
      {
        name: "Privat",
        fields: [
          {
            inputType: "text",
            label: "Vorname"
          },
          {
            inputType: "text",
            label: "Nachname"
          },
          {
            inputType: "text",
            label: "Benutzername"
          },
          {
            inputType: "email",
            label: "E-Mail"
          },
          {
            inputType: "password",
            label: "Passwort"
          },
          {
            inputType: "password",
            label: "Passwort wiederholen"
          }
        ]
      },
      {
        name: "Unternehmen",
        fields: [
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
