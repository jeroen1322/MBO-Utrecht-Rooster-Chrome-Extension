//A function to impliment DRY, so I can use native JS but don't have to type too much.
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

//Declare some vars with some that will be used with the getBYId function.
var extraKnoppen = getById("extra_knoppen");
var knoppen = getById("knoppen");
var reset = getById("reset");
var iframe = getById("myFrame");
var volgendeWeekKnop = getById("volgende_week");
var vorigeWeekKnop = getById("vorige_week");
var homepage = "homepage.html";

iframe.src = homepage; //Declare the default source of the iFrame
extraKnoppen.display("none"); //Hide the div 'extraKnoppen'

//Function to check if the user has picked a klas (choice) and act accordingly
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

//Declare some vars
var weekNumber = (new Date()).getWeek();
var currentWeek = weekNumber - 1;
var nextWeek = weekNumber;
var volgendeWeek = false;
var checkVolgendeWeek = volgendeWeek;

//Function to parse the week number correctly
//And also check what week to dislay. The current week or next week.
function chooseWeek(){
  if(volgendeWeek != checkVolgendeWeek){
    volgendeWeekKnop.display("none");
    vorigeWeekKnop.display("block");
    if(currentWeek > 10){
      return nextWeek;
    }else{
      return "0" + nextWeek;
    }
  } else {
    vorigeWeekKnop.display("none");
    volgendeWeekKnop.display("block");
    if(currentWeek > 10){
      return currentWeek;
    }else{
      return "0" + currentWeek;
    }
  }
}

//If the buttons are clicked, manipulate the vars
//And run setPage() to reload the iFrame.
//The logic in chooseWeek() will choose what week to display
volgendeWeekKnop.onclick = function(){
  volgendeWeek = true;
  setPage();
}
vorigeWeekKnop.onclick = function(){
  volgendeWeek = false;
  setPage();
}


//Parse the weeknumber to the iFrame and also the code of the selected klas.
function makePageURL(page) {
  console.log(page);
  var URL = "http://roosters.mboutrecht.nl/TEC/roosters/" + chooseWeek()  + "/c/" + page + '.htm';
  return URL;
}

//A whole bunch of fucking shit I had to type by hand.
var classes = {
  "klas2MI1A": "c00004",
  "klas2MI1B": "c00005",
  "klas2MI1C": "c0006",
  "klas2MI2A": "c00007",
  "klas3MB1A": "c00008",
  "klas3MB1B": "c00009",
  "klas3MB2A": "c00010",
  "klas4IB34A": "c0002",
  "klas4NB34A": "c0003",
  "klas3MB3A": "c00011",
  "klas4IB1A": "c00019",
  "klas4IB1B": "c00020",
  "klas4IB2A": "c00021",
  "klas4NB3A": "c00012",
  "klas4NB4A": "c00013",
  "klas4AM1A": "c00012",
  "klas4AM1B": "c00013",
  "klas4AM2A": "c00014",
  "klas4AM3A": "c00015",
  "klas4AM3B": "c00016",
  "klas4AM4A": "c00017",
  "klas4AM4B": "c00018",
  "klasYTWK123": "c00019",
  "klas4ENG1": "c00030",
  "klas4ENG2": "c00031",
  "klas4ENG3": "c00032",
  "klas4ENG4": "c00033",
  "klasYTVCLB4": "c00038",
  "klasYT4ENG4": "c00022",
  "klas4BMRV3": "c00023",
  "klasYTBMV2": "c00024",
  "klasYTBRV2": "c00025",
  "klas4BM1": "c00026",
  "klas4BR1": "c00027",
  "klas4BV1A": "c00028",
  "klas4BV1B": "c00029",
  "klas4IT1": "c00022",
  "klas4IT2": "c00025",
  "klas4IT3": "c00026",
  "klas4BM3": "c00027",
  "klas4BR2": "c00028",
  "klas4BV2": "c00029",
  "klas4BV3": "c00030",
  "klas4BR3": "c00033",
  "klasBM2": "c00036",
  "klasB4": "c00037",
  "klas4AM2B": "c00041",
  "klas2MI2B": "c00042",
  "klasYISTDV": "c00043",
  "klas4BM2": "c00037",

};

//Get the code from the selected class
//And also put the choise in the localStorage.
function setPage(){
  for (var keyClass in classes) {
    var page = classes[keyClass] || 'notfound';

    (function(page, keyClass) {
        document.getElementById(keyClass).onclick = function() {
            localStorage.setItem('choice', page);
            choiceIsSet(true, makePageURL(page));
        };
    })(page, keyClass);
  }

  //If there is a choise set, run the function that makes the page
  //And takes in to account what page to display.
  var choice = localStorage.getItem('choice');
  if (choice) {
    //console.log(choice);
    choiceIsSet(true, makePageURL(choice));
  }
}

//Run by default
setPage();
