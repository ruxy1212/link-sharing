import * as THREE from 'three';

class Vector3WithOpacity extends THREE.Vector3 {
  opacity: number;
  r: number;
  g: number;
  b: number;

  constructor(x = 0, y = 0, z = 0, opacity = 1, r = 1, g = 1, b = 0) {
    super(x, y, z);
    this.opacity = opacity;
    this.r = r;
    this.g = g;
    this.b = b;
  }
}