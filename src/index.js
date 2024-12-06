//const
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
var lost = false;
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
const dialog = document.querySelector("dialog");
const closeButton = document.getElementById("close");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");
const dontShowButton = document.getElementById("notShowAnymore")
closeButton.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("load", showDialog());

function showDialog(){
  dialog.showModal();
}
//generate alphabet button
function generateButton() {
  var buttonsHTML = "abcçdefghijklmnopqrstuvwxyzëêêéè"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

//word array
const question = [
  "Catégorie: Une Équipe De Soccer De La Première Ligue",
  "Catégorie: Film",
  "Catégorie: Villes"
];

const categories = [
  [
    "everton",
    "liverpool",
    "swansea",
    "chelsea",
    "hull",
    "manchester-city",
    "newcastle-united",
    
  ],
  ["alien", "inspecteur-harry", "gladiateur", "trouver-némo", "les-dents-de-la-mer", "spider-man", "les-bagnoles", "rapides-et-dangereux"],
  ["manchester", "milan", "madrid", "amsterdam", "prague", "washington", "montréal"]
];

const hints = [
  [
    "Situé dans le Mersyside",
    "Situé dans le Mersyside",
    "Première équipe galloise à atteindre la Premier League",
    "Possédée par un Milliardaire Russe",
    "A déja été gérée par Phil Brown",
    "Finalistes de la coupe FA de 2013",
    "Le premier club de Gazza"
  ],
  [
    "Film d'horreur de science-fiction",
    "Film d'action américain de 1971",
    "Drame historique",
    "Poisson animé",
    "Requin blanc géant",
    "Film de fiction incluant un personnage costumé en rouge",
    "voiture rapide rouge",
    "Film de course le plus connu"
  ],
  [
    "Ville du nord du Royaume-Uni",
    "Ville d'AC et de l'Inter",
    "Capitale espagnole",
    "Capitale des Pays-Bas",
    "Capitale de la République tchèque",
    "Capitale des États-unis",
    "Ville ayant le plus d'habitants au Québec"
  ]
];

window.onload = function() {
  dialog.close();  // Afficher le dialogue avec le backdrop
};
//set question,answer and hint




//FONCTIONNALITÉ
function RevealWord(){
  var button = document.getElementById("view_word");
  button.innerHTML = "Le mot était: " + answer;
}




function setAnswer() {
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[categoryOrder];
  //remove the reveal word button
  var button = document.getElementById("view_word");
  button.classList.add("hidden");
  button.innerHTML = "Afficher le mot";
  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

function generateAnswerDisplay(word) {
  var wordArray = word.split("");
  //console.log(wordArray);
  for (var i = 0; i < answer.length; i++) {
    lost = false;
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}

function showHint() {
  containerHint.innerHTML = `Indice - ${hint}`;
}

buttonHint.addEventListener("click", showHint);
//setting initial condition
function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `Tu as ${life} vies!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}

window.onload = init();

//reset (play again)
buttonReset.addEventListener("click", init);
//guess click
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `TU AS GAGNÉ !`;
    lost = false;
    return;
  } else {
    if (life > 0) {
      lost = false;
      for (var j = 0; j < answer.length; j++) {
        lost = false;
        if (guessWord === answerArray[j]) {
          lost = false;
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `Tu as ${life} vies!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `Tu as ${life} vies!`;
      } else {
        livesDisplay.innerHTML = `TU AS PERDU`;
        lost = true;
      }
    } else {
      return;
    } 
    
    
    
    //FONCTIONNALITÉ
    if(lost == true){
      var button = document.getElementById("view_word");
      button.classList.remove("hidden");
      button.addEventListener("click", RevealWord);
    }




    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `TU AS GAGNÉ!`;
      lost = false;
      return;
    }
  }
}

container.addEventListener("click", guess);

// Hangman
function animate() {
  drawArray[life]();
  //console.log(drawArray[life]);
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
];
