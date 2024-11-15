import * as THREE from "three";

export class Stick extends THREE.Mesh {
  constructor(
    { position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 } },
    cube
  ) {
    super(
      new THREE.CylinderGeometry(0.05, 0.05, 2, 32), // radiusTop, radiusBottom, height, radialSegments
      new THREE.MeshStandardMaterial({ color: "brown" })
    );
    // Position the stick in front of the cube
    const offsetZ = cube.depth / 2 + 1; // 1 unit out in front of the cube
    const offsetY = cube.height / 2; // Adjust to position at "hand" level if desired
    const offsetX = cube.width / 2; //position on right hand

    this.position.set(
      offsetX,
      cube.position.y + offsetY,
      cube.position.z - offsetZ
    );

    // Rotate the stick to make it appear as if held out horizontally
    this.rotation.set(rotation.x, rotation.y, rotation.z);
    this.rotation.x = Math.PI / 1.5; // Rotate along X-axis to align horizontally
  }
}
