class AudioEngine {

  playSound(player, sound) {

    const distance = this.getDistance(player);

    let volume = Math.max(0, 1 - distance / 50);

    return {
      sound,
      volume,
      spatial: true
    };
  }

  getDistance(player) {
    return Math.sqrt(player.x ** 2 + player.y ** 2);
  }
}

module.exports = { AudioEngine };