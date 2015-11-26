// Credits aan Stephan Meijer. Heeft JS overzichtelijker gemaakt en DRY geïmplimenteerd

function choiceIsSet(yes, page) {
    if (yes) {
        document.getElementById("knoppen").style.display = "none";
        document.getElementById("reset").style.display = "inline";
        document.getElementById("myFrame").src = page;
    } else {
        document.getElementById("knoppen").style.display = "inline";
        document.getElementById("reset").style.display = "none";
        document.getElementById("myFrame").src = "homepage.html";
    }
}

// Verwijder localStorage data zodat de klas opnieuw gekozen kan worden
document.getElementById("reset").onclick = function() {
    localStorage.removeItem("choice");
    choiceIsSet(false);
};

// De rest
function makePageURL(page) {
        //Huidige week nummer in src link zetten
    var currentWeekNumber = (function(date){
        date.setHours(0,0,0);
        date.setDate(date.getDate()+4-(date.getDay()||7));
        return Math.ceil((((date - new Date(date.getFullYear(),0,1))/8.64e7)+1)/7);
    })(new Date());
    return "http://roosters.mboutrecht.nl/TEC/roosters/" + currentWeekNumber + "/c/" + page + '.htm';
}

var classes = {
    "klas2MI1A": "c00001",
    "klas2MI1B": "c00002",
    "klas2MI2A": "c00003",
    "klas3MB1A": "c00004",
    "klas3MB2A": "c00005",
    "klas3MB3A": "c00006",
    "klas4IB1A": "c00007",
    "klas4IB1B": "c00008",
    "klas4IB2A": "c00009",
    "klas4IB3A": "c00010",
    "klas4IB4A": "c00011",
    "klas4NB3A": "c00012",
    "klas4NB4A": "c00013",
    "klas4AM1A": "c00014",
    "klas4AM1B": "c00015",
    "klas4AM2A": "c00016",
    "klas4AM3A": "c00017",
    "klas4AM4A": "c00018",
    "klasYTWK123": "c00019",
    "klas4ENG1": "c00020",
    "klas4ENG2": "c00021",
    "klas4IT1": "c00022",
    "klas4BM1": "c00023",
    "klas4BR1": "c00024",
    "klas4IT2": "c00025",
    "klas4IT3": "c00026",
    "klas4BM3": "c00027",
    "klas4BR2": "c00028",
    "klas4BV2": "c00029",
    "klas4BV3": "c00030",
    "klas4ENG3": "c00031",
    "klas4ENG4": "c00032",
    "klas4BR3": "c00033",
    "klas4BV1A": "c00034",
    "klas4BV1B": "c00035",
    "klasBM2": "c00036",
    "klasB4": "c00037",
    "klas4AM4B": "c00038",
    "klas4AM3B": "c00039",
    "klas4AM2B": "c00040",
    "klas2MI2B": "c00041",
    "klasYISTDV": "c00042"
};

for (var keyClass in classes) {
    var page = classes[keyClass] || 'notfound';

    (function(page, keyClass) {
        document.getElementById(keyClass).onclick = function() {
            localStorage.setItem('choice', page);
            choiceIsSet(true, makePageURL(page));
        };
    })(page, keyClass);
}

var choice = localStorage.getItem('choice');

if (choice) { // Wanneer er een keuze is gemaakt ...
    // ... zet de iframe op de juiste rooster-pagina en haal de klassen knoppen weg.
    choiceIsSet(true, makePageURL(choice));
}

