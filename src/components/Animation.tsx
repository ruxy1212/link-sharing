import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import chroma from 'chroma-js';
import { OrbitControls } from '@react-three/drei';
import { Canvas,useFrame,ThreeElements } from "@react-three/fiber";

interface VectorWithExtra {
  vector: THREE.Vector3;
  opacity?: number;
  r?: number;
  g?: number;
  b?: number;
}

class Vector3WithExtra extends THREE.Vector3 {
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

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 600 / 168,  0.1,  2000);
      camera.position.z = 180;
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
      renderer.setSize(600, 168);
      // document.body.appendChild(renderer.domElement);
      containerRef.current?.appendChild(renderer.domElement);

      // const scene = new THREE.Scene();
      // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      // const renderer = new THREE.WebGLRenderer();
      // renderer.setSize(window.innerWidth, window.innerHeight);
      // containerRef.current?.appendChild(renderer.domElement);
      // camera.position.z = 5;

      // ===================
      // const controlsWebGL = new THREE.OrbitControls(camera, renderer.domElement);
      /* PARTICLES */
      const gradient = chroma.scale(["633bff","beadff","efebff","ea8282","ff3939"]);
      const paths = document.querySelectorAll("path");
      console.log(paths);
      const vertices: Vector3WithExtra[] = [];
      const colors: number[] = [];
      const sizes: number[] = [];
      const tl = gsap.timeline({
        onReverseComplete: () => {
          tl.timeScale(1);
          tl.play(0);
        },
        onComplete: () => {
          tl.timeScale(1.3);
          tl.reverse(0);
        }
      });
      let delay = 0;
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
      });
      let totalLength = 0;
      Array.from(paths).forEach(p => totalLength += (p as SVGPathElement).getTotalLength());
      Array.from(paths).reverse().forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength();
        for (let i = 0; i < length; i += 0.2) {
          const pointLength = i;
          const point = (path as SVGPathElement).getPointAtLength(pointLength);
          const vector = new Vector3WithExtra(
            point.x - 210.33 / 2,
            -point.y + 125.85 / 2,
            (Math.random() - 0.5) * 15
          )
          // const vector = new THREE.Vector3(
          //   point.x - 210.33 / 2,
          //   -point.y + 125.85 / 2,
          //   (Math.random() - 0.5) * 15
          // );
          const end = new THREE.Vector3(
            vector.x + (Math.random() - 0.5) * 80,
            vector.y + (Math.random() - 0.5) * 80,
            vector.z + (Math.random() - 0.5) * 80
          );
          let coloursX = point.x / 210.33 + (Math.random() - 0.5) * 0.2;
          coloursX = end.distanceTo(new THREE.Vector3()) / 200;
          coloursX = (delay + pointLength) / totalLength;
          const color = gradient(coloursX).rgb();

          vector.opacity = 1;
          vertices.push(vector);

          const initialColor = { r: 0.4, g: 0.2, b: 1.0 }; // Purple color (R, G, B)
          const fadeFactor = 1 - (vector.z + 7.5) / 15;

          vector.r = initialColor.r + (1 - initialColor.r) * fadeFactor;
          vector.g = initialColor.g + (1 - initialColor.g) * fadeFactor;
          vector.b = initialColor.b + (1 - initialColor.b) * fadeFactor;
  
          tl.to(
            vector,
            {
              x: end.x,
              y: end.y,
              z: end.z,
              r: color[0] / 255,
              g: color[1] / 255,
              b: color[2] / 255,
              duration: 'random(0.5, 2)',
              ease: 'power2.out'
            },
            (delay + pointLength) * 0.0012 + 1.2
          );
          sizes.push((Math.random() * 3 + 2) * renderer.getPixelRatio());
        }
        delay += length;
      });
      const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
      geometry.setAttribute(
        "customColor",
        new THREE.Float32BufferAttribute(colors, 3)
      );
      geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
      const material = new THREE.ShaderMaterial({
        uniforms: {
          pointTexture: {
            value: new THREE.TextureLoader().load(
              "https://assets.codepen.io/127738/dotTexture.png"
            )
          }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 customColor;
          varying vec3 vColor;
          void main() {
            vColor = customColor;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_PointSize = size * ( 300.0 / -mvPosition.z );
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          varying vec3 vColor;
          varying float vOpacity;
          void main() {
            float strength = distance(gl_PointCoord, vec2(0.5));
            if (strength > 0.4) discard;
            strength = step(0.4, strength);
            strength = 1.0 - strength;
            gl_FragColor = vec4(vColor * strength, strength);
          }
        `,
        transparent: true
      });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      /* RENDERING */
      const render = () => {
        requestAnimationFrame(render);
  
        geometry.setFromPoints(vertices);
  
        const colours: number[] = [];
        vertices.forEach(v => {
          colours.push(v.r, v.g, v.b);
        });
        geometry.setAttribute("customColor", new THREE.Float32BufferAttribute(colours, 3));
  
        renderer.render(scene, camera);
      };

      // const onWindowResize = () => {
      //   camera.aspect = window.innerWidth / window.innerHeight;
      //   camera.updateProjectionMatrix();
      //   renderer.setSize(window.innerWidth, window.innerHeight);
      // };
      // const onMouseMove = (e: MouseEvent) => {
      //   const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      //   const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      //   gsap.to(particles.rotation, {
      //     x: y * 0.2,
      //     y: x * 0.2,
      //     ease: 'power2.out',
      //     duration: 2
      //   });
      // };
      // window.addEventListener('resize', onWindowResize, false);
      // window.addEventListener('mousemove', onMouseMove, false);
  
      requestAnimationFrame(render);
  
      return () => {
        // window.removeEventListener('resize', onWindowResize);
        // window.removeEventListener('mousemove', onMouseMove);
        // mount.removeChild(renderer.domElement);
      };
    }
  }, []);

  return <div className="-translate-x-1/2" ref={containerRef} />;
};

export default ThreeScene;