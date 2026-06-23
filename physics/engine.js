function checkHitbox(player, enemy) {

  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const hitRange = enemy.hitbox || 2;

  return distance <= hitRange;
}

function applyPhysics(entity, delta) {

  entity.velocityY -= 9.8 * delta; // gravity

  entity.y += entity.velocityY;

  if (entity.y < 0) {
    entity.y = 0;
    entity.velocityY = 0;
  }
}

module.exports = { checkHitbox, applyPhysics };