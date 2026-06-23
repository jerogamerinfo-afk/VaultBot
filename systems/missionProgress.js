async function addProgress(db, userId, type, amount = 1) {

  let mission = await db.get(`mission_${userId}`);
  if (!mission) return;

  if (
    (type === "spin" && mission.id === "use_spin") ||
    (type === "battle" && mission.id === "win_battle") ||
    (type === "collect" && mission.id === "collect_cards")
  ) {

    mission.progress += amount;

    if (mission.progress >= mission.goal) {
      mission.completed = true;
    }

    await db.set(`mission_${userId}`, mission);
  }
}

module.exports = { addProgress };