// 🧠 Base simple WebGL world (frontend concept)

export function initWorld(gl, players) {

  function render() {

    gl.clear(gl.COLOR_BUFFER_BIT);

    players.forEach(p => {

      // 🔵 render player cube
      gl.drawArrays(gl.POINTS, p.x, p.y, 1);
    });

    requestAnimationFrame(render);
  }

  render();
}