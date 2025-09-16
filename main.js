let createButton = document.getElementById("newCard");
let saveButton = document.getElementById("saveNote");
let deleteButton = document.getElementById("deleteNote");
let titleInput = document.getElementById("title-input");
let textInput = document.getElementById("textarea");
const notesList = document.querySelector(".notesList"); // passt zu deinem HTML

let selectedCard = null; // unbedingt ausserhalb, damit alle Funktionen darauf zugreifen können

function newCard() {
  titleInput.value = "";
  textInput.value = "";
}

function saveNote() {
  // Werte auslesen
  let titleInput = document.getElementById("title-input").value;
  let textInput = document.getElementById("textarea").value;

  if (!titleInput && !textInput) {
    // nichts zum Speichern vorhanden
    alert("Bitte Überschrift und Text eingeben.");
    return;
  }

  // aktuelles Datum erzeugen
  let today = new Date();
  let formattedDate = today.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", formattedDate);

  card.innerHTML = `
<h2>${titleInput}</h2>
  <p>${textInput}</p> 
  <p>${formattedDate}</p>
`;
  console.log("Notiz gespeichert:", { titleInput, textInput, formattedDate });

  // im localStorage speichern
  localStorage.setItem("Daten", JSON.stringify("titleInput, textarea"));

  // im localStorage laden
  // let gespeicherteDaten = localStorage.getItem("Daten");
  // console.log(Daten);

  // im localStorage anzeigen
  // const newdate = JSON.parse(localStorage.getItem(gespeicherteDaten));

  notesList.appendChild(card);
}

// Klick auf eine Karte => Auswahl toggeln
notesList.addEventListener("click", (e) => {
  const clicked = e.target.closest(".card");
  if (!clicked) return;

  if (selectedCard) selectedCard.classList.remove("selected");
  clicked.classList.add("selected");
  selectedCard = clicked;
});

// globaler Delete-Button entfernt ausgewählte Karte
function deleteNote() {
  if (!selectedCard) {
    alert("Bitte zuerst eine Karte anklicken (auswählen).");
    return;
  }
  selectedCard.remove();
  selectedCard = null;
}

createButton.addEventListener("click", newCard);
saveButton.addEventListener("click", saveNote);
deleteButton.addEventListener("click", deleteNote);

// console.log(card.forEach((card) => console.log(card.idNr)));

// console.log(selectedCard.sort((itemA, itemB) => itemA.data - id - itemB.data - id));
