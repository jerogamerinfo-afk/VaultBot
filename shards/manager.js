const shards = {
  eu: new Map(),
  na: new Map(),
  sa: new Map()
};

function assignShard(player) {

  if (player.region === "EU") shards.eu.set(player.id, player);
  if (player.region === "NA") shards.na.set(player.id, player);
  if (player.region === "SA") shards.sa.set(player.id, player);
}

function getShard(region) {
  return shards[region.toLowerCase()];
}

module.exports = { assignShard, getShard };