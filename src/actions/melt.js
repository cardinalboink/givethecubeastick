export function melt(scene, enemy, enemies) {
  const shrinkSpeed = 0.05;
  const shrinkAnimation = setInterval(() => {
    if (!enemy || !scene.children.includes(enemy)) {
      clearInterval(shrinkAnimation);
      return;
    }

    // Shrink the enemy
    enemy.scale.x -= shrinkSpeed;
    enemy.scale.y -= shrinkSpeed;
    enemy.scale.z -= shrinkSpeed;

    // Stop shrinking and remove the enemy when it disappears
    if (enemy.scale.x <= 0 || enemy.scale.y <= 0 || enemy.scale.z <= 0) {
      clearInterval(shrinkAnimation);
      scene.remove(enemy);
      const index = enemies.indexOf(enemy);
      if (index > -1) enemies.splice(index, 1);
    }
  }, 10);
}
