const parties = new Map();

function createParty(ownerId) {
  parties.set(ownerId, [ownerId]);
}

function joinParty(ownerId, userId) {
  if (!parties.has(ownerId)) return;
  parties.get(ownerId).push(userId);
}

function getParty(ownerId) {
  return parties.get(ownerId) || [];
}

module.exports = { createParty, joinParty, getParty };