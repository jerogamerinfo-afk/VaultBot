function globalEvent(io, event) {

  io.emit("global_event", {
    type: event.type,
    intensity: event.intensity,
    zone: event.zone
  });
}