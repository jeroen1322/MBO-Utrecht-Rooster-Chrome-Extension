
function getById(id){
  var obj = document.getElementById(id);

  obj.display = function(display){
    this.style.display = display;
  };
  obj.src = function(src){
    this.src = src;
  };
  obj.marginRight = function(marginRight){
    this.style.marginRight = marginRight;
  };

  return obj;
}

var extraKnoppen = getById("extra_knoppen");
var knoppen = getById("knoppen");
var reset = getById("reset");
var iframe = getById("myFrame");
var homepage = "homepage.html";
// var getVolgendeWeekKnop = document.getElementById("volgende_week");
// var getVorigeWeekKnop = document.getElementById("vorige_week");
var volgendeWeekKnop = getById("volgende_week");
var vorigeWeekKnop = getById("vorige_week");

iframe.src = homepage;
extraKnoppen.display("none");


function choiceIsSet(yes, page) {
  if (yes) {
    knoppen.display("none");
    extraKnoppen.display("inline-flex");
    reset.marginRight("10px");
    iframe.src = page;
  } else {
    knoppen.display("inline");
    extraKnoppen.display("none");
    iframe.src = homepage;
  }
}
// Verwijder localStorage data zodat de klas opnieuw gekozen kan worden
document.getElementById("reset").onclick = function() {
  localStorage.removeItem("choice");
  choiceIsSet(false);
};

//Krijg het huidige weeknummer
Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

var weekNumber = (new Date()).getWeek();

var currentWeek = weekNumber - 1;
var nextWeek = weekNumber;
var volgendeWeek = false;
var checkVolgendeWeek = volgendeWeek;

function chooseWeek(){
  if(volgendeWeek != checkVolgendeWeek){
    volgendeWeekKnop.display("none");
    vorigeWeekKnop.display("block");
    console.log("Not equal");
    if(currentWeek > 10){
      return nextWeek;
    }else{
      return "0" + nextWeek;
    }
  } else {
    vorigeWeekKnop.display("none");
    volgendeWeekKnop.display("block");
    console.log("equal");
    if(currentWeek > 10){
      return currentWeek;
    }else{
      return "0" + currentWeek;
    }
  }
}

volgendeWeekKnop.onclick = function(){
  volgendeWeek = true;
  setWeek();
}
vorigeWeekKnop.onclick = function(){
  volgendeWeek = false;
  setWeek();
}


// De .src van de iFrame aanpassen
function makePageURL(page) {
  var URL = "http://roosters.mboutrecht.nl/TEC/roosters/" + chooseWeek()  + "/c/" + page + '.htm';
  return URL;
}


var classes = {
  "klas2MI1A": "c00001",
  "klas2MI1B": "c00002",
  "klas2MI1C": "c00034",
  "klas2MI2A": "c00003",
  "klas3MB1A": "c00004",
  "klas3MB1B": "c00005",
  "klas3MB2A": "c00006",
  "klas4IB34A": "c00018",
  "klas4NB34A": "c00019",
  "klas3MB3A": "c00007",
  "klas4IB1A": "c00015",
  "klas4IB1B": "c00016",
  "klas4IB2A": "c00017",
  "klas4NB3A": "c00012",
  "klas4NB4A": "c00013",
  "klas4AM1A": "c00008",
  "klas4AM1B": "c00009",
  "klas4AM2A": "c00010",
  "klas4AM3A": "c00033",
  "klas4AM4A": "c00013",
  "klasYTWK123": "c00019",
  "klas4ENG1": "c00027",
  "klas4ENG2": "c00028",
  "klas4IT1": "c00022",
  "klas4BM1": "c00020",
  "klas4BR1": "c00023",
  "klas4IT2": "c00025",
  "klas4IT3": "c00026",
  "klas4BM3": "c00027",
  "klas4BR2": "c00028",
  "klas4BV2": "c00029",
  "klas4BV3": "c00030",
  "klas4ENG3": "c00029",
  "klas4ENG4": "c00030",
  "klas4BR3": "c00033",
  "klas4BV1A": "c00035",
  "klas4BV1B": "c00036",
  "klasBM2": "c00036",
  "klasB4": "c00037",
  "klas4BMRV3": "c00021",
  "klas4AM4B": "c00039",
  "klas4AM3B": "c00040",
  "klas4AM2B": "c00041",
  "klas2MI2B": "c00042",
  "klasYTBMV2": "c00022",
  "klasYTBRV2": "c00024",
  "klasYTVCLB4": "c00038",
  "klasYT4ENG4": "c00032",
  "klasYISTDV": "c00043",
  "klas4BM2": "c00037",

};

function setWeek(){
  for (var keyClass in classes) {
    var page = classes[keyClass] || 'notfound';

    (function(page, keyClass) {
        document.getElementById(keyClass).onclick = function() {
            localStorage.setItem('choice', page);
            console.log(page);
            choiceIsSet(true, makePageURL(page));
        };
    })(page, keyClass);
  }

  var choice = localStorage.getItem('choice');
  console.log(choice);

  if (choice) { // Wanneer er een keuze is gemaakt ...
    // ... zet de iframe op de juiste rooster-pagina en haal de klassen knoppen weg.
    console.log(choice);
    choiceIsSet(true, makePageURL(choice));
  }
}

setWeek();
