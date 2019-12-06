/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  // adds each letter to the screen from the secret phrase
  addPhraseToDisplay() {
    let phraseSection = document.getElementById("phrase");
    let ul = phraseSection.firstElementChild;

    this.phrase.split("").forEach(ch => {
      let newElement = document.createElement("li");
      newElement.innerText = ch;
      if (ch === " ") {
        newElement.className = "space";
      } else {
        newElement.classList.add("hide");
        newElement.classList.add("letter");
        newElement.classList.add(ch);
      }
      ul.appendChild(newElement);
    });
  }

  // returns true or false if the letter was found in the secret phrase
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }

  // change classes on a letter if it is a match
  showMatchedLetter(letter) {
    let keys = document.querySelectorAll(`li.${letter}`);
    keys.forEach(key => {
      key.classList.remove("hide");
      key.classList.add("alter");
      key.classList.add("show");
      setTimeout(function() {
        key.classList.remove("alter");
      }, 1000);
    });
  }
}
