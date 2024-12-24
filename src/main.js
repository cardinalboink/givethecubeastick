import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Box } from "../src/components/Box";
import { listener } from "./actions/eventListeners";
import { collide } from "./actions/collide";
import { Stick } from "../src/components/Stick";
import { melt } from "./actions/melt";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); //FOV, ratio, near, far
//set camera position
camera.position.set(4.61, 2.74, 8);
const renderer = new THREE.WebGLRenderer({
  alpha: true, //background
  antialias: true, //make sharp & clear
}); //WebGLRenderer adv: pauses when the user navigates to another browser tab

//area to fill
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// scene.background = new THREE.Color(0xffd3da);

//add the renderer element to our HTML document
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// 1 create cube
const cube = new Box({
  width: 1,
  height: 1,
  depth: 1,
  color: "green",
  velocity: { x: 0, y: -0.01, z: 0 },
});
cube.castShadow = true;
cube.receiveShadow = true;

//3 using other than MeshBasicMaterial, needa add light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.z = 1; //in front
light.position.y = 3; // on top

light.castShadow = true;
const ambient = new THREE.AmbientLight(0xffffff, 0.3);

scene.add(cube);
scene.add(light);
scene.add(ambient);

//creating a mesh platform
const ground = new Box({
  width: 10,
  height: 0.5,
  depth: 20,
  color: "#DBFCFF",
  position: { x: 0, y: -2, z: 0 },
});
ground.castShadow = true;
ground.receiveShadow = true;
scene.add(ground);

//create weapon
// const stick = new THREE.Mesh(stickGeometry, stickMaterial);
const stick = new Stick(
  {
    position: {
      x: 0,
      y: 0,
      z: -1,
    },
  },
  cube
);
const stickGroup = new THREE.Group(); //
stickGroup.add(stick);
stickGroup.position.set(cube.width / 2 - 0.4, 0, cube.position.z); // Place it at the cube's right edge

let swingProgress = 0; // 0 to 1 (percentage of swing completion)
const swingSpeed = 0.05;
const maxAngle = Math.PI / 4;

const enemies = [];
let frame = 0;
let spawnRate = 200;

//move the camera out a bit
camera.position.z = 5;

if (WebGL.isWebGL2Available()) {
  // Initiate function or other initializations here
  //   renderer.setAnimationLoop(animate);
  animate();
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById("container").appendChild(warning);
}

//key actions
listener(cube, stickGroup);

function animate() {
  const animationId = requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // Update cube position and attach stick to cube
  cube.update(ground);
  if (!cube.children.includes(stickGroup)) cube.add(stickGroup);
  // updateJump()

  if (stickGroup.isSwinging) {
    swingProgress += swingSpeed;
    const angle =
      Math.sin(swingProgress * Math.PI) * maxAngle * stickGroup.swingDirection;
    stickGroup.rotation.z = angle;

    if (swingProgress >= 1) {
      stickGroup.isSwinging = false;
      swingProgress = 0;
      stickGroup.rotation.z = 0; // Reset stick to default position
    }
  }

  // Enemy spawning
  if (frame % spawnRate === 0) {
    if (spawnRate > 30) spawnRate -= 20;
    const enemy = new Box({
      width: 1,
      height: 2,
      depth: 1,
      position: { x: (Math.random() - 0.5) * 10, y: 0, z: -10 },
      color: "red",
      velocity: { x: 0, y: 0, z: 0.05 },
    });
    enemy.castShadow = true;
    enemy.receiveShadow = true;
    scene.add(enemy);
    enemies.push(enemy);
  }

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];

    if (enemy.isMelted) continue;

    enemy.update(ground);

    const distance = cube.position.distanceTo(enemy.position);
    const threshold = 1.5;
    if (distance < threshold) {
      console.log("Cube Collision detected");
      handleGameOver();
      break;
    }

    if (collide({ box1: stick, box2: enemy })) {
      console.log("Stick Collision detected");
      enemy.isMelted = true;
      melt(scene, enemy, enemies);
      return;
    }
  }

  function handleGameOver() {
    cancelAnimationFrame(animationId);
    alert("Game Over! Click OK to restart.");
    window.location.reload();
  }
  frame++;
}
