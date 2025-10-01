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
    if (parsed && typeof parsed === "object") {
      return [parsed]; // einzelnes Objekt in Array packen
    }
    return []; // alles andere
  } catch (e) {
    console.error("Fehler beim Parsen:", e);
    return [];
  }
}

console.log("Gelesene Daten aus Storage:", loadFromStorage()); // kein Array vorhanden

// im localStorage speichern -> hier muss bei JSON.stringify ein Array rein
function saveToStorage(arr) {
  localStorage.setItem("Daten", JSON.stringify(arr));
}

console.log("Gespeicherte Daten im Storage:", localStorage.getItem("Daten"));

function renderNotes() {
  notesList.innerHTML = ""; // vorher aufräumen
  cards = loadFromStorage("Daten"); // globale cards aktualisieren

  console.log("zu rendernde Karten:", cards);

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
}

function saveNote(title, text, id) {
  // Werte auslesen
  let titleInput = document.getElementById("title-input").value;
  let textInput = document.getElementById("textarea").value;

  if (!titleInput || !textInput) {
    // nichts zum Speichern vorhanden
    alert("Bitte Überschrift und Text eingeben.");
    return;
  }

  let noteObj;
  let existing = loadFromStorage(); // aktuelles Array aus Storage holen

  // wenn eine Karte ausgewählt ist, diese updaten, sonst neue Karte erstellen
  if (selectedCard) {
    const idToUpdate = selectedCard.getAttribute("data-id");
    const idx = existing.findIndex((n) => n.id === idToUpdate);
    if (idx !== -1) {
      existing[idx].title = titleInput;
      existing[idx].text = textInput;
      existing[idx].date = new Date().toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }
  } else {
    noteObj = {
      id: Date.now().toString(),
      title: titleInput,
      text: textInput,
      date: new Date().toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    existing.push(noteObj);
  }
  saveToStorage(existing);
  cards = existing; // globale Variable updaten
  renderNotes();

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

  // aus Storage entfernen
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
