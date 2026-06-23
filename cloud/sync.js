const servers = new Map();

function syncPlayer(serverId, userId, data) {

  if (!servers.has(serverId)) {
    servers.set(serverId, {});
  }

  servers.get(serverId)[userId] = data;
}

function getGlobalPlayer(userId) {

  let result = null;

  for (const server of servers.values()) {
    if (server[userId]) result = server[userId];
  }

  return result;
}

module.exports = { syncPlayer, getGlobalPlayer };