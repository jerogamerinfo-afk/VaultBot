const EVENTS = [
  {
    name: "🔥 Evento Fuego",
    bonus: "shiny +10%"
  },
  {
    name: "💀 Evento Oscuro",
    bonus: "secret +15%"
  }
];

function getEvent() {
  return EVENTS[Math.floor(Math.random() * EVENTS.length)];
}

module.exports = { getEvent };