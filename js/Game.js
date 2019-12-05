/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      new Phrase("Get in the zone"),
      new Phrase("May I have some more"),
      new Phrase("If you just believe"),
      new Phrase("Two is better than one"),
      new Phrase("The name is Bond")
    ];
    this.activePhrase = null;
  }

  // hides the overlay screen so the user can then see the game
  // gets a random phrase for the game to use
  startGame() {
    document.getElementById("overlay").style.display = "none";
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  // chooses a random phrase out of 5 choices
  getRandomPhrase() {
    let randomNum = Math.floor(Math.random() * 5);
    return this.phrases[randomNum];
  }

  // handles the logic for if the keyboard was pressed or a key on the screen
  // then assigns the correct classes if the letter was a match or not
  handleInteraction(target) {
    const buttons = [...document.querySelectorAll(".key")];
    if (target.type === "keyup") {
      if (target.code.substring(0, 3) === "Key") {
        if (this.activePhrase.checkLetter(target.key)) {
          for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerText === target.key) {
              buttons[i].classList.add("chosen");
              buttons[i].disabled = true;
              this.activePhrase.showMatchedLetter(target.key);
              if (this.checkForWin()) {
                this.gameOver("win");
              }
            }
          }
        } else {
          for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerText === target.key) {
              if (buttons[i].classList.contains("wrong")) {
                return;
              } else {
                buttons[i].classList.add("wrong");
                buttons[i].disabled = true;
                this.removeLife();
              }
            }
          }
        }
      }
    } else {
      target.disabled = true;
      let letter = target.innerText;

      if (this.activePhrase.checkLetter(letter)) {
        target.classList.add("chosen");
        this.activePhrase.showMatchedLetter(letter);
        if (this.checkForWin()) {
          this.gameOver("win");
        }
      } else {
        target.classList.add("wrong");
        this.removeLife();
      }
    }
  }

  // changes a live heart to a lost heart when an answer is wrong
  // and increase the number of missed guesses if the user makes a wrong guess
  removeLife() {
    if (this.missed < 4) {
      let images = [...document.querySelectorAll("img")];

      for (let i = this.missed; i < images.length; i++) {
        if (images[i].src.includes("images/liveHeart.png")) {
          images[i].src = "images/lostHeart.png";
          break;
        }
      }
      this.missed += 1;
    } else {
      this.gameOver("lose");
    }
  }

  // logic below: does querySelector find .hide? if true, then falsey it because its not a win
  // if any characters have the hide class then that means the game is still going
  checkForWin() {
    return !document.querySelector(".hide");
  }

  // reveal either a win or lose overlay and revert the number of missed guesses
  gameOver(result) {
    document.getElementById("overlay").style.display = "";
    this.missed = 0;
    let h1 = document.getElementById("game-over-message");
    let overlay = document.getElementById("overlay");
    overlay.classList.remove("start");

    if (result === "win") {
      overlay.classList.add("win");
      h1.textContent = "Congratulations, you won!";
    } else {
      overlay.classList.add("lose");
      h1.textContent = "You lost.";
    }
  }
}
