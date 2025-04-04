import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface Spinner3DProps {
  isSpinning: boolean;
}

const Spinner3D = ({ isSpinning }: Spinner3DProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const [speed, setSpeed] = useState(0.01)
  
  useEffect(() => {
    if (isSpinning) {
      setSpeed(0.05)
    } else {
      setSpeed(0.01)
    }
  }, [isSpinning])
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += speed
      groupRef.current.rotation.y += speed * 1.3
      
      setRotation({
        x: groupRef.current.rotation.x,
        y: groupRef.current.rotation.y,
        z: groupRef.current.rotation.z
      })
    }
  })
  
  // Gerar números aleatórios para mostrar no cubo
  const numbers = Array.from({ length: 6 }, () => 
    Math.floor(Math.random() * 100) + 1
  )
  
  return (
    <group ref={groupRef}>
      <RoundedBox args={[3, 3, 3]} radius={0.15} smoothness={4}>
        <meshPhongMaterial 
          color="#4361ee" 
          opacity={0.7}
          transparent
          side={THREE.DoubleSide}
          specular={new THREE.Color('#ffffff')}
          shininess={100}
        />
        
        {/* Frente */}
        <Text
          position={[0, 0, 1.51]}
          fontSize={1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {numbers[0]}
        </Text>
        
        {/* Trás */}
        <Text
          position={[0, 0, -1.51]}
          fontSize={1}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
        >
          {numbers[1]}
        </Text>
        
        {/* Direita */}
        <Text
          position={[1.51, 0, 0]}
          fontSize={1}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI / 2, 0]}
        >
          {numbers[2]}
        </Text>
        
        {/* Esquerda */}
        <Text
          position={[-1.51, 0, 0]}
          fontSize={1}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[0, -Math.PI / 2, 0]}
        >
          {numbers[3]}
        </Text>
        
        {/* Cima */}
        <Text
          position={[0, 1.51, 0]}
          fontSize={1}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI / 2, 0, 0]}
        >
          {numbers[4]}
        </Text>
        
        {/* Baixo */}
        <Text
          position={[0, -1.51, 0]}
          fontSize={1}
          color="white"
          anchorX="center"
          anchorY="middle"
          rotation={[Math.PI / 2, 0, 0]}
        >
          {numbers[5]}
        </Text>
      </RoundedBox>
      
      {/* Partículas flutuantes ao redor do cubo quando está girando */}
      {isSpinning && (
        <>
          {Array.from({ length: 30 }).map((_, index) => {
            const radius = 3 + Math.random() * 2
            const theta = Math.random() * Math.PI * 2
            const phi = Math.random() * Math.PI
            
            const x = radius * Math.sin(phi) * Math.cos(theta)
            const y = radius * Math.sin(phi) * Math.sin(theta)
            const z = radius * Math.cos(phi)
            
            return (
              <mesh key={index} position={[x, y, z]}>
                <sphereGeometry args={[0.05 + Math.random() * 0.1, 8, 8]} />
                <meshBasicMaterial color="#4ade80" />
              </mesh>
            )
          })}
        </>
      )}
    </group>
  )
}

export default Spinner3D 