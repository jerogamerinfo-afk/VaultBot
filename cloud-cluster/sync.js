const servers = new Map();

function sync(serverId, player) {

  if (!servers.has(serverId)) {
    servers.set(serverId, new Map());
  }

  servers.get(serverId).set(player.id, player);
}

function getGlobalState() {

  let all = [];

  for (const server of servers.values()) {
    all.push(...Array.from(server.values()));
  }

  return all;
}

module.exports = { sync, getGlobalState };