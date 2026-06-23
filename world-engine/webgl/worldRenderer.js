export class WorldRenderer {

  constructor(gl, worldState) {
    this.gl = gl;
    this.worldState = worldState;
  }

  render(players, zones) {

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // 🌍 render players
    players.forEach(p => {
      this.drawEntity(p.x, p.y, p.z, "player");
    });

    // 🏙️ render world zones
    zones.forEach(z => {
      this.drawEntity(z.x, z.y, z.z, "zone");
    });
  }

  drawEntity(x, y, z, type) {
    // 🧱 placeholder WebGL draw call
    console.log(`Render ${type} at`, x, y, z);
  }
}