const EventEmitter = require("events");
const bus = new EventEmitter();

function broadcast(event, data) {
  bus.emit(event, data);
}

module.exports = { bus, broadcast };