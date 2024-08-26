"use client"

import { Center } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Logo from "./logo";

export default function Scene() {
  return (
    <Canvas gl={{antialias: true}} dpr={[1, 1.5]}>
      <directionalLight position={[-5, -5, 5]} intensity={2} />
      <Suspense fallback={null}>
        <Center>
          <Logo />
        </Center>
      </Suspense>
    </Canvas> 
  )
}