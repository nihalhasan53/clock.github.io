function GetButtonFontSizeForLanguage(language, windowWidth) {
    "use strict";
    if (language === 1 && windowWidth <= 320) {
        return "0.85em";
    }
    return "0.9em";
}

function GetDrumLabelFontSizeForLanguage(language, windowWidth) {
    "use strict";
    if (windowWidth > 320) {
        return "19px";
    }
    if (language === 2) {
        return "15px";
    }
    if (language === 3) {
        return "17px";
    }
    return "19px";
}

function GetTopPaddingForLanguage(language, windowWidth) {
    "use strict";
    if (windowWidth > 320) {
        return "8px"; //"22px";
    }
    if (language === 3 || language === 2) { //German and Spanish on small screens
        return "9px"; //"24px";
    }
    return "8px"; //"22px";
}

function GetRightPaddingForHoursForLanguage(language, windowWidth) {
    "use strict";
    switch (language) {
        case 0:
            {
                if (windowWidth <= 320) {
                    return "65.7%";
                } else if (windowWidth <= 375) {
                    return "68.4%";
                } else {
                    return "70.4%";
                }
                break;
            }
        case 1:
            {
                if (windowWidth <= 320) {
                    return "65.7%";
                } else if (windowWidth <= 375) {
                    return "68.4%";
                } else {
                    return "70.4%";
                }
                break;
            }
        case 2:
            {
                if (windowWidth <= 320) {
                    return "63.7%";
                } else if (windowWidth <= 375) {
                    return "61.4%";
                } else {
                    return "63.4%";
                }
                break;
            }
        case 3:
            {
                if (windowWidth <= 320) {
                    return "67.7%";
                } else if (windowWidth <= 375) {
                    return "68.4%";
                } else {
                    return "70.4%";
                }
                break;
            }
        default:
            {
                if (windowWidth <= 320) {
                    return "65.7%";
                } else if (windowWidth <= 375) {
                    return "68.4%";
                } else {
                    return "70.4%";
                }
            }
    }
}

function GetRightPaddingForMinutesForLanguage(language, windowWidth) {
    "use strict";
    switch (language) {
        case 0:
            {
                if (windowWidth <= 320) {
                    return "37.5%";
                } else if (windowWidth <= 375) {
                    return "39%";
                } else {
                    return "40%";
                }
                break;
            }
        case 1:
            {
                if (windowWidth <= 320) {
                    return "24.5%";
                } else if (windowWidth <= 375) {
                    return "27%";
                } else {
                    return "29%";
                }
                break;
            }
        case 2:
            {
                if (windowWidth <= 320) {
                    return "38.5%";
                } else if (windowWidth <= 375) {
                    return "38%";
                } else {
                    return "39%";
                }
                break;
            }
        case 3:
            {
                if (windowWidth <= 320) {
                    return "26.5%";
                } else if (windowWidth <= 375) {
                    return "27%";
                } else {
                    return "29%";
                }
                break;
            }
        default:
            {
                if (windowWidth <= 320) {
                    return "37.5%";
                } else if (windowWidth <= 375) {
                    return "39%";
                } else {
                    return "40%";
                }
            }
    }
}

function GetRightPaddingForSecondsForLanguage(language, windowWidth) {
    "use strict";
    switch (language) {
        case 0:
            {
                if (windowWidth <= 320) {
                    return "1%";
                } else if (windowWidth <= 375) {
                    return "2%";
                } else {
                    return "4%";
                }
                break;
            }
        case 1:
            {
                if (windowWidth <= 320) {
                    return "10%";
                } else if (windowWidth <= 375) {
                    return "10%";
                } else {
                    return "10%";
                }
                break;
            }
        case 2:
            {
                if (windowWidth <= 320) {
                    return "1%";
                } else if (windowWidth <= 375) {
                    return "1%";
                } else {
                    return "1%";
                }
                break;
            }
        case 3:
            {
                if (windowWidth <= 320) {
                    return "10%";
                } else if (windowWidth <= 375) {
                    return "10%";
                } else {
                    return "10%";
                }
                break;
            }
        default:
            {
                if (windowWidth <= 320) {
                    return "1%";
                } else if (windowWidth <= 375) {
                    return "2%";
                } else {
                    return "4%";
                }
            }
    }
}

function GetImageNameForLanguage(language, imageName) {
    "use strict";
    switch (language) {
        case 0:
            {
                return "./images/en/" + imageName;
            }
        case 1:
            {
                return "./images/fr/" + imageName;
            }
        case 2:
            {
                return "./images/de/" + imageName;
            }
        case 3:
            {
                return "./images/es/" + imageName;
            }
        default:
            {
                console.log("Unknown language key: " + language);
                return "./images/en/" + imageName;
            }
    }
}

function GetImageCSSForLanguage(language, imageName) {
    "use strict";
    switch (language) {
        case 0:
            {
                return "url(images/en/" + imageName + ")";
            }
        case 1:
            {
                return "url(images/fr/" + imageName + ")";
            }
        case 2:
            {
                return "url(images/de/" + imageName + ")";
            }
        case 3:
            {
                return "url(images/es/" + imageName + ")";
            }
        default:
            {
                console.log("Unknown language key: " + language);
                return "url(images/en/" + imageName + ")";
            }
    }
}

function GetTranslation(language, key) {
    "use strict";
    switch (language) {
        case 0:
            {
                return lang_en[key];
            }
        case 1:
            {
                return lang_fr[key];
            }
        case 2:
            {
                return lang_de[key];
            }
        case 3:
            {
                return lang_es[key];
            }
        default:
            {
                console.log("Unknown language key: " + language);
                return lang_en[key];
            }
    }
}
var lang_en = {
    Timer: "Timer",
    Stopwatch: "Stopwatch",
    Bedtime: "Bedtime",
    Alarm: "Alarm",
    WorldClock: "World Clock",
    Edit: "Edit",
    Start: "Start",
    Cancel: "Cancel",
    WhenTimerEnds: "When Timer Ends",
    Hours: "hours",
    Minutes: "min",
    Seconds: "sec",
    Hearts: "Hearts",
    Clubs: "Clubs",
    Diamonds: "Diamonds",
    Spades: "Spades",
    First: "First",
    Second: "Second",
    BottomCard: "Bottom Card",
    TopCard: "Top Card",
    Unlicensed: "Unlicensed"
};

var lang_fr = {
    Timer: "Minuteur",
    Stopwatch: "Chronomètre",
    Bedtime: "Sommeil",
    Alarm: "Alarme",
    WorldClock: "Horloges",
    Edit: "Modifier",
    Start: "Démarrer",
    Cancel: "Annuler",
    WhenTimerEnds: "Sonnerie",
    Hours: "heure",
    Minutes: "minutes",
    Seconds: "s",
    Hearts: "Cœurs",
    Clubs: "Clubs",
    Diamonds: "Diamants",
    Spades: "Piques",
    First: "Premier",
    Second: "Seconde",
    BottomCard: "Carte du bas",
    TopCard: "Carte supérieure",
    Unlicensed: "Sans licence"
};

var lang_de = {
    Timer: "Timer",
    Stopwatch: "Stoppuhr",
    Bedtime: "Schlafenszeit",
    Alarm: "Wecker",
    WorldClock: "Weltuhr",
    Edit: "Bearbeiten",
    Start: "Start",
    Cancel: "Löschen",
    WhenTimerEnds: "Timer-Ende",
    Hours: "Stunden",
    Minutes: "Min.",
    Seconds: "Sek.",
    Hearts: "Herz",
    Clubs: "Kreuz",
    Diamonds: "Karo",
    Spades: "Pik",
    First: "Erste",
    Second: "Zweite",
    BottomCard: "Untere Karte",
    TopCard: "Oberste Karte",
    Unlicensed: "Nicht lizenziert"
};

var lang_es = {
    Timer: "Temporizador",
    Stopwatch: "Cronómetro",
    Bedtime: "Sueño",
    Alarm: "Alarma",
    WorldClock: "Reloj mundial",
    Edit: "Editar",
    Start: "Iniciar",
    Cancel: "Cancelar",
    WhenTimerEnds: "Al finalizar",
    Hours: "horas",
    Minutes: "minutos",
    Seconds: "s",
    Hearts: "Corazones",
    Clubs: "Treboles",
    Diamonds: "Diamantes",
    Spades: "Picas",
    First: "Primero",
    Second: "Segundo",
    BottomCard: "Tarjeta inferior",
    TopCard: "Tarjeta superior",
    Unlicensed: "No licenciado"
};