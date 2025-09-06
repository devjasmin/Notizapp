const card = [
  {
    title: "Überschrift",
    text: "Notiz",
    id: "title-input",
    date: "new Date()",
    idNr: 1,

    title: "Überschrift1",
    text: "Notiz",
    id: "title-input",
    date: "new Date()",
    idNr: 2,

    title: "Überschrift2",
    text: "Notiz",
    id: "title-input",
    date: "new Date()",
    idNr: 3,

    title: "Überschrift3",
    text: "Notiz",
    id: "title-input",
    date: "new Date()",
    idNr: 4,
  },
];

localStorage.setItem("card-daten", JSON.stringify(card));

const daten = JSON.parse(localStorage.getItem("card"));
console.log(card);
console.log(card.title);
console.log(card.text);
console.log(card.id);
console.log(card.date);
console.log(card.idNr);

console.log(card.forEach((card) => console.log(card.idNr)));

console.log(card.sort((itemA, itemB) => itemB.idNr - itemA.idNr));

new Date().toLocaleDateString("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
