export function collide({ box1, box2 }) {
  const xCollision = box1.right >= box2.left && box1.left <= box2.right;
  const zCollision = box1.front >= box2.back && box1.back <= box2.front;
  const yCollision =
    box1.top >= box2.bottom && box1.bottom + box1.velocity.y <= box2.top;

  return xCollision && zCollision && yCollision;
}
