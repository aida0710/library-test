'use client';

import React, {useRef} from 'react';
import {Canvas, ThreeElements, useFrame} from '@react-three/fiber';
import {useGLTF, Stage, Grid, OrbitControls, Environment} from '@react-three/drei';
import {EffectComposer, Bloom, ToneMapping} from '@react-three/postprocessing';
import {easing} from 'maath';

export const Robots = () => {
    return (
        <Canvas
            flat
            shadows
            camera={{position: [-15, 0, 10], fov: 25}}>
            <fog
                attach='fog'
                args={['black', 15, 22.5]}
            />
            <Stage
                intensity={0.5}
                environment='city'
                shadows={{type: 'accumulative', bias: -0.001, intensity: Math.PI}}
                adjustCamera={false}>
                <Box rotation={[0, Math.PI, 0]} />
            </Stage>
            <Grid
                renderOrder={-1}
                position={[0, -1.85, 0]}
                infiniteGrid
                cellSize={0.6}
                cellThickness={0.6}
                sectionSize={3.3}
                sectionThickness={1.5}
                // @ts-ignore
                sectionColor={[0.5, 0.5, 10]}
                fadeDistance={30}
            />
            <OrbitControls
                autoRotate
                autoRotateSpeed={0.05}
                enableZoom={false}
                makeDefault
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
            />
            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={2}
                    mipmapBlur
                />
                <ToneMapping />
            </EffectComposer>
            <Environment
                background
                preset='sunset'
                blur={0.8}
            />
        </Canvas>
    );
};

function Box(props: ThreeElements['mesh']) {
    const head = useRef();
    const stripe = useRef();
    const light = useRef();
    const {nodes, materials} = useGLTF('/model_1.glb');
    useFrame((state, delta) => {
        const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2;
        // @ts-ignore
        stripe.current.color.setRGB(2 + t * 20, 2, 20 + t * 50);
        // @ts-ignore
        easing.dampE(head.current.rotation, [0, state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0], 0.4, delta);
        // @ts-ignore
        light.current.intensity = 1 + t * 4;
    });
    return (
        // @ts-ignore
        <group {...props}>
            <mesh
                castShadow
                receiveShadow
                // @ts-ignore
                geometry={nodes.body001.geometry}
                material={materials.Body}
            />
            <group
                // @ts-ignore
                ref={head}>
                <mesh
                    castShadow
                    receiveShadow
                    // @ts-ignore
                    geometry={nodes.head001.geometry}
                    material={materials.Head}
                />
                <mesh
                    castShadow
                    receiveShadow
                    // @ts-ignore
                    geometry={nodes.stripe001.geometry}>
                    <meshBasicMaterial
                        // @ts-ignore
                        ref={stripe}
                        toneMapped={false}
                    />
                    <pointLight
                        // @ts-ignore
                        ref={light}
                        intensity={1}
                        color={[10, 2, 5]}
                        distance={2.5}
                    />
                </mesh>
            </group>
        </group>
    );
}

useGLTF.preload('/model_1glb');
