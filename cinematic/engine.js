class CinematicEngine {

  constructor(io) {
    this.io = io;
  }

  playSequence(playerId, scenes) {

    let index = 0;

    const next = () => {

      if (index >= scenes.length) return;

      const scene = scenes[index++];

      this.io.to(playerId).emit("cinematic_frame", {
        title: scene.title,
        camera: scene.camera,
        focus: scene.focus,
        duration: scene.duration
      });

      setTimeout(next, scene.duration);
    };

    next();
  }
}

module.exports = { CinematicEngine };