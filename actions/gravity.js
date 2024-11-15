import { collide } from "./collide";

export function applyGravity({ box1, box2 }) {
  box1.velocity.y += box1.gravity;
  //stop fall action + bounce effect
  // if (box1.bottom + box1.velocity.y <= box2.top) {
  if (collide({ box1, box2 })) {
    const friction = 0.5;
    box1.velocity.y *= friction;
    //go up
    box1.velocity.y = -box1.velocity.y;
  } //else  continue falling
  else {
    box1.position.y += box1.velocity.y;
  }
}
