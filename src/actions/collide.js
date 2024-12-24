// export function collide({ box1, box2 }) {
//   const xCollision = box1.right >= box2.left && box1.left <= box2.right;
//   const zCollision = box1.front >= box2.back && box1.back <= box2.front;
//   const yCollision =
//     box1.top >= box2.bottom && box1.bottom + box1.velocity.y <= box2.top;

//   return xCollision && zCollision && yCollision;
// }

import * as THREE from "three";

export function collide({ box1, box2 }) {
  const box1BoundingBox = new THREE.Box3().setFromObject(box1);
  const box2BoundingBox = new THREE.Box3().setFromObject(box2);

  box1BoundingBox.setFromObject(box1);
  box2BoundingBox.setFromObject(box2);

  box1BoundingBox.expandByScalar(0.1);

  return box1BoundingBox.intersectsBox(box2BoundingBox);
}
