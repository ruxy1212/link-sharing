"use client"

import { Center } from "@react-three/drei";
import { OrbitControls } from '@react-three/drei'
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Logo from "./logo";

export default function Scene({ onLoaded }: { onLoaded: () => void }) {
  return (
    <Canvas gl={{antialias: true}} dpr={[1, 1.5]}>
      <directionalLight position={[0, 0, 5]} intensity={3} />
      <Suspense fallback={null}>
        <Center>
          <Logo onLoaded={onLoaded} />
        </Center>
      </Suspense>
      <OrbitControls />
    </Canvas> 
  )
}