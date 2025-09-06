const createButton = document.getElementById("newCard");
const saveButton = document.getElementById("saveNote");
const deleteButton = document.getElementById("deleteNote");
const titleInput = document.getElementById("title-input");
const textInput = document.getElementById("textarea");

function newCard() {
  console.log("neue Nachricht erstellt");
}

function saveNote() {
  console.log("Nachricht gespeichert");
}

function deleteNote() {
  console.log("Nachricht gelöscht!");
}

createButton.addEventListener("click", newCard);
saveButton.addEventListener("click", saveNote);
deleteButton.addEventListener("click", deleteNote);

let card = [
  {
    title: "Überschrift",
    text: "Notiz",
    date: "new Date()",
    idNr: 1,
  },
  {
    title: "Überschrift1",
    text: "Notiz",
    date: "new Date()",
    idNr: 2,
  },
  {
    title: "Überschrift2",
    text: "Notiz",
    date: "new Date()",
    idNr: 3,
  },
  {
    title: "Überschrift3",
    text: "Notiz",
    date: "new Date()",
    idNr: 4,
  },
];

console.log(card.forEach((card) => console.log(card.idNr)));

console.log(card.sort((itemA, itemB) => itemA.idNr - itemB.idNr));

new Date().toLocaleDateString("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

//card.push(card);

//im LocalStorage speichern
localStorage.setItem("card-daten", JSON.stringify(card));

const daten = JSON.parse(localStorage.getItem("card"));
