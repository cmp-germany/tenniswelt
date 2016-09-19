window.contentLandingPage = [
  { module: "TitleWithRegisterForm",
    contents: {
      title: "Marcs Tennis Tracker",
      text:
        "Zugriff auf Ihre persönlichen Spielstatistiken.",
      formTitle: "Kostenpflichtige Registrierung.",
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
        src: "gfx/landing-page/powered-by-mkg.png"
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
  }
];
