# starters.koeln

Frontend for Code for the platform starters.koeln.

## Preview

please visit [cmpg.eu/starters.koeln](http://cmpg.eu/starters.koeln)

## Entwicklungsumgebung einrichten

- Install [Visual Studio Code](https://code.visualstudio.com/download)
- Install [PuTTY](http://www.putty.org/)
- Install [Git](https://git-scm.com/downloads)
- Install [node.js](https://nodejs.org/de/)
- Install [ruby](https://rubyinstaller.org/)
    - 2.2.6 (32Bit)
    - "Add Ruby executables to your PATH"
- Install Compass (Visual Studio Code -> `ctrl` + `ö`):
```
gem update --system
gem install compass
```

## Neues Portal erstellen

### 1. Starters Portal forken

- gehe zum [starters Portal auf bitbucket](https://bitbucket.org/cmphub/starters.koeln)
- klicke auf das **`+`** in der Navbar
- klicke ganz unten auf "*Fork* this repository"
- Owner: `cmphub` | Project: `Portal-Design` | Name: *[neuer Portal Name]*

### 2. starters Projekt auf cmpg.eu kopieren

- logge dich mit putty auf cmpg.eu ein:
  - Host Name: `cmpg.eu`
  - User: `u46759`
  - Password: `6c6c86aa`
- kopiere die Plattform:

```
cd cmpg.eu
cp -R starters.koeln [neuer Portal Name]
exit
```

### 3. Pipeline einrichten

- Im neuen Portal zu *Settings* -> *Settings* (unter Pipelines) -> *Enable Pipelines*
- *Environment variables*
  - `FTP_USERNAME`: `u46759`
  - `FTP_PASSWORD`: `6c6c86aa` **secured**
  - `SERVER_ADDRESS`: `cmpg.eu`
  - `PATH_TO_WEBSITE`: `cmpg.eu/[neuer Portal Name]`

### 4. Lokales Projekt einrichten

- Im neuen Portal in bitbucket auf *Overview* klicken.
- Adresse aus dem Feld ganz oben kopieren
- **Visual Studio Code** öffnen
- `ctrl` + `⇧` + `P` -> "Git: Klonen"
- Kopierte Adresse eingeben (Weitere Daten eingeben)
- Nach dem Klonen das Projekt öffnen
- mit `ctrl` + `Ö` Terminal öffnen
- `npm install`
- Für jedes der folgenden Befehle ein weiteres Terminal öffnen:
  - `compass watch`
  - `npm run watch`
  - `npm run dev-server`
- den Browser auf `http://localhost:8080/` öffnen


## 8 Schritte fürs Portal Design

### 1. Farben anpassen
> `sass/_variables.sass:1`

### 2. Logo austauschen
> `modules/logo.html:2`  
> `sass/_navbar.sass:15`

### 3. Titel ändern
> `data/title.js`

### 4. Landingpage Content
> `data/landingPage.js`

### 5. Header Bild
> `sass/_navbar.sass:22`

### 6. Preferred Partner
> `modules/preferred-partners.html`

### 7. Navbar Menu
> `data/navbarMenu.json`

### 8. Readme ändern
> `README.md`