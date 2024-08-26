"use client"

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { AnimationAction, Group, MathUtils } from "three";

export default function Logo() {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 20 });
  const group = useRef<Group>(null);

  useFrame(() => {
    group.current?.rotateX(MathUtils.degToRad(0.9)).rotateY(MathUtils.degToRad(0.4)).rotateZ(MathUtils.degToRad(0.9));
    Object.keys(actions).forEach((key) => {
      const action = actions[key] as AnimationAction;
      action.play().paused = true;
      action.time = spring.get();
    })
  })

  const { animations, scene } = useGLTF("/third1.glb");
  const { actions } = useAnimations(animations, scene);
  return (
    <group 
      onPointerDown={() => motionVal.set(0)}
      onPointerOut={() => motionVal.set(0)}
      onPointerOver={() => motionVal.set(0.9)}
      onPointerUp={() => motionVal.set(0.9)}
      // onPointerOut={() => motionVal.set(1.2)}
      ref={group}
    >
      <primitive object={scene} /> 
    </group>
  )
}