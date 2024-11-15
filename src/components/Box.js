import * as THREE from "three";
import { applyGravity } from "../actions/gravity";

export class Box extends THREE.Mesh {
  constructor({
    width,
    height,
    depth,
    color = 0xffffff,
    velocity = { x: 0, y: 0, z: 0 },
    position = { x: 0, y: 0, z: 0 },
    zAcceleration = false,
  }) {
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color })
    );
    this.height = height;
    this.width = width;
    this.depth = depth;
    this.color = color;

    this.position.set(position.x, position.y, position.z);

    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;

    this.right = this.position.x + this.width / 2;
    this.left = this.position.x - this.width / 2;

    this.front = this.position.z + this.depth / 2;
    this.back = this.position.z - this.depth / 2;

    this.velocity = velocity;

    this.gravity = -0.002; // pulling down effect

    this.zAcceleration = zAcceleration;

    //position = initial position of obj
    //velocity = 0 if obj not intially moving, +/- if moving
    //gravity = constant force
  }

  updateSides() {
    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;
    this.left = this.position.x - this.width / 2;
    this.right = this.position.x + this.width / 2;
    this.front = this.position.z + this.depth / 2;
    this.back = this.position.z - this.depth / 2;
  }

  update(ground) {
    this.updateSides();
    if (this.zAcceleration) this.velocity.z += 0.0003;
    applyGravity({ box1: this, box2: ground });

    //move left, front
    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;
  }
}
