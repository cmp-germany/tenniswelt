window.contentLandingPage = [
  { module: "TitleWithRegisterForm",
    contents: {
      title: "Unsere Maßstäbe - Tradition und Innovation",
      text:
        "Unsere Schule übernimmt Verantwortung für eine erfolgreiche berufliche Zukunft unserer Schülerinnen und Schüler. Wir stellen neben der Vermittlung von Kompetenzen und Fachwissen die Erziehungsaufgabe in den Mittelpunkt unserer Arbeit. Erziehung orientiert sich an den Werten eines geeinten Europas. Gerade in einer Schule, deren Schülerinnen und Schüler eine große Vielfalt an Bildungsgängen, Altersgruppen, Vorbildungen, Kulturen und Nationalitäten repräsentieren, hat Erziehung Leistung, soziales Lernen und Integration jedes Einzelnen im Blick. Dies ist nicht nur Aufgabe einzelner Unterrichtsfächer, sondern zentraler Gedanke im täglichen Schulleben.",
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
        title: "Kurse online buchen",
        text: "Buchen Sie jetzt ihre Kurse und Weiterbildungen online und ersparen Sie sich eine Menge Papierarbeit.",
        icon: "assignment_turned_in",
        button: {
          text: "Jetzt registrieren",
          url: "#register-form"
        }
      },
      {
        title: "Schulungsmaterialien",
        text: "Finden Sie alle Schulungsmaterialien an einem Ort. Kein lästiges suchen mehr, alles ist nur einen Mausklick entfernt.",
        icon: "assignment",
        button: {
          text: "Jetzt registrieren",
          url: "#register-form"
        }
      }
    ]
  },
  { module: "SlideStatement",
    title: "Bei uns lernen Sie. Schnell, sicher, erfolgreich.",
    background: {
      src: "http://source.unsplash.com/9o8YdYGTT64/1920x1080",
      positionX: "50%",
      positionY: "50%"
    }
  }
];
