class CameraSystem {

  constructor() {
    this.position = { x: 0, y: 5, z: 10 };
    this.rotation = { x: 0, y: 0, z: 0 };
  }

  follow(target) {
    this.position.x = target.x - 5;
    this.position.y = target.y + 3;
    this.position.z = target.z + 10;
  }

  freeMove(input) {
    this.position.x += input.x;
    this.position.y += input.y;
    this.position.z += input.z;
  }
}