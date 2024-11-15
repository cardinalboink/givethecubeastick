export function listener(cube, stick) {
  const keysPressed = {}; // Track key states

  function updateVelocity() {
    // Reset velocity
    cube.velocity.x = 0;
    cube.velocity.z = 0;

    // Update velocity based on active keys
    if (keysPressed["KeyA"]) cube.velocity.x = -0.1;
    if (keysPressed["KeyD"]) cube.velocity.x = 0.1;
    if (keysPressed["KeyW"]) cube.velocity.z = -0.1;
    if (keysPressed["KeyS"]) cube.velocity.z = 0.1;
  }

  window.addEventListener("keydown", (event) => {
    keysPressed[event.code] = true;

    switch (event.code) {
      case "Space":
        if (cube.position.y > 1) {
          cube.velocity.y = cube.velocity.y;
        } else cube.velocity.y = 0.1;

        break;
      case "ArrowLeft":
        stick.rotation.z = Math.sin(5) * (Math.PI / 4); // swing left
        break;
      case "ArrowRight":
        stick.rotation.z = Math.sin(-5) * (Math.PI / 4); // swing right
        break;
    }

    updateVelocity();
  });

  window.addEventListener("keyup", (event) => {
    keysPressed[event.code] = false;

    if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
      stick.rotation.z = 0; // Reset stick rotation
    }

    updateVelocity(); // Update velocity based on remaining active keys
  });
}
