let createButton = document.getElementById("newCard");
let saveButton = document.getElementById("saveNote");
let deleteButton = document.getElementById("deleteNote");
let titleInputEl = document.getElementById("title-input");
let textInputEl = document.getElementById("textarea");
const notesList = document.querySelector(".notesList"); // Container für Karten

let cards = []; // Array von {id, title, text, date}
let selectedCard = null; // unbedingt ausserhalb, damit alle Funktionen darauf zugreifen können

// --- Storage-Hilfen ---
function loadFromStorage() {
  const raw = localStorage.getItem("Daten");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed; // korrektes Array
    }
    // Falls z.B. nur ein Objekt drin liegt
    if (parsed && typeof parsed === "object") {
      return [parsed];
    }
    return [];
  } catch (e) {
    console.error("Fehler beim Parsen:", e);
    return [];
  }
}

// im localStorage speichern -> hier muss bei JSON.stringify ein Array rein
function saveToStorage(arr) {
  localStorage.setItem("Daten", JSON.stringify(arr));
}

function renderNotes() {
  notesList.innerHTML = ""; // vorher aufräumen
  cards = loadFromStorage(); // globale cards aktualisieren

  cards.forEach((note) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", note.id);

    const titleEl = document.createElement("h2");
    titleEl.textContent = note.title;

    const textEl = document.createElement("p");
    textEl.textContent = note.text;

    const dateEl = document.createElement("p");
    dateEl.textContent = note.date;

    // Elemente in die Karte hängen
    card.appendChild(titleEl);
    card.appendChild(textEl);
    card.appendChild(dateEl);

    // Karte in den Container hängen
    notesList.appendChild(card);
  });
}

function newCard() {
  titleInputEl.value = "";
  textInputEl.value = "";
  if (selectedCard) {
    selectedCard.classList.remove("selected");
    selectedCard = null;
  }
}

function saveNote() {
  // Werte auslesen
  let titleInput = document.getElementById("title-input").value;
  let textInput = document.getElementById("textarea").value;

  if (!titleInput || !textInput) {
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
    second: "2-digit",
  });

  // neues Notiz-Objekt
  const noteObj = {
    id: Date.now().toString(),
    title: titleInput,
    text: textInput,
    date: formattedDate,
  };

  let id = undefined;

  //const sortedNotes = cards.sort((itemA, itemB) => itemA.id - itemB.id);
  // console.log(sortedNotes);

  // bestehendes Array einlesen, neues Element pushen, speichern
  const existing = loadFromStorage();
  existing.push(noteObj);
  saveToStorage(existing);

  // UI neu rendern
  notesList.innerHTML = "";
  renderNotes();
  console.log("Notiz gespeichert:", noteObj);
}

// globaler Delete-Button entfernt ausgewählte Karte
function deleteNote() {
  if (!selectedCard) {
    alert("Bitte zuerst eine Karte anklicken.");
    return;
  }

  const idToRemove = selectedCard.getAttribute("data-id");

  // Element aus DOM entfernen
  selectedCard.remove();
  selectedCard = null;

  // aus storage entfernen
  cards = loadFromStorage().filter((c) => c.id !== idToRemove);
  saveToStorage(cards);
  renderNotes();
}

// Klick auf eine Karte => Auswählen und bearbeiten
notesList.addEventListener("click", (e) => {
  const clicked = e.target.closest(".card");
  if (!clicked) return;

  // vorher ausgewählte Karte "deselecten" und Änderungen speichern
  if (selectedCard) {
    selectedCard.classList.remove("selected");
    selectedCard.removeAttribute("contenteditable");

    // Änderungen zurück ins Array schreiben
    const id = clicked.getAttribute("data-id");
    const found = cards.find((c) => c.id === id);
    if (found) {
      titleInputEl.value = found.title;
      textInputEl.value = found.text;
    }
  }
  // Neue Karte auswählbar machen
  clicked.classList.add("selected");
  clicked.setAttribute("contenteditable", "true");
  clicked.focus();
  selectedCard = clicked;
});

createButton.addEventListener("click", newCard);
saveButton.addEventListener("click", saveNote);
deleteButton.addEventListener("click", deleteNote);

// Beim Start vorhandene Notizen rendern
notesList.innerHTML = "";
renderNotes();
