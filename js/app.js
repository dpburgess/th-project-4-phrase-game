let game;

// create a new instance of the Game class and add an event listener for the start button
// also cleans up the game after it has ended so a new game can be played
document.getElementById("btn__reset").addEventListener("click", () => {
  game = new Game();

  let phraseUl = document.getElementById("phrase").firstElementChild;
  let wrongElements = document.querySelectorAll(".wrong");
  let chosenElements = document.querySelectorAll(".chosen");

  while (phraseUl.children.length > 0) {
    let firstLi = phraseUl.firstElementChild;
    firstLi.parentNode.removeChild(firstLi);
  }

  wrongElements.forEach(element => {
    element.classList.remove("wrong");
    element.disabled = false;
  });

  chosenElements.forEach(element => {
    element.classList.remove("chosen");
    element.disabled = false;
  });

  let images = [...document.querySelectorAll("img")];

  for (let i = 0; i < images.length; i++) {
    if (images[i].src.includes("images/lostHeart.png")) {
      images[i].src = "images/liveHeart.png";
    }
  }

  game.startGame();
});

// event listener for physical keyboard keys
// make sure the keys are just the alphabet
document.addEventListener("keyup", event => {
  console.log(event);
  game.handleInteraction(event);
});

// event listener for onscreen keyboard buttons
document.getElementById("qwerty").addEventListener("click", event => {
  if (event.target.nodeName === "BUTTON") {
    game.handleInteraction(event.target);
  }
});
