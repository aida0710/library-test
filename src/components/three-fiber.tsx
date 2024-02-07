"use client";

import {Canvas, ThreeElements, useFrame} from "@react-three/fiber";
import React, {useRef, useState} from "react";
import {useTheme} from "next-themes";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import {BoxGeometry, LineSegments, Mesh} from "three";
import {OrbitControls} from "@react-three/drei";

export const ThreeFiber = () => {
    return (
        <>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box />
                <OrbitControls />
            </Canvas>
        </>
    );
}

function Box(props: ThreeElements['mesh']) {
    const meshRef = useRef<Mesh>(null);
    const lineRef = useRef<LineSegments>(null);
    const { resolvedTheme } = useTheme();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
        if (lineRef.current) {
            lineRef.current.rotation.x += 0.01;
            lineRef.current.rotation.y += 0.01;
        }
    });

    const color = resolvedTheme === "dark" ? "#1CD4FF" : "#777";

    return (
        <>
            {hovered && (
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.1}
                        intensity={1.5}
                        luminanceSmoothing={0.4}
                    />
                </EffectComposer>
            )}

            <mesh
                onClick={() => click(!clicked)}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                ref={meshRef}
            >
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color={color} transparent opacity={0.2} />
            </mesh>
            <lineSegments ref={lineRef}>
                <edgesGeometry attach="geometry" args={[new BoxGeometry(2, 2, 2)]} />
                <lineBasicMaterial color={color} />
            </lineSegments>
        </>
    );
}