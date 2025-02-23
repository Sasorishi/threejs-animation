import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function Test() {
  const mountRef = useRef(null);

  useEffect(() => {
    // 1️⃣ Création de la scène
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#F0F0F0");

    // 2️⃣ Création de la caméra
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 3️⃣ Création du cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshLambertMaterial({
      color: "#468585",
      emissive: "#468585",
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 4️⃣ Ajout d'une lumière
    const light = new THREE.DirectionalLight(0x9cdba6, 10);
    light.position.set(1, 1, 1);
    scene.add(light);

    // 5️⃣ Création du renderer et attachement au DOM
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 6️⃣ Animation du cube
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // 7️⃣ Nettoyage lors du démontage du composant
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
}

export default Test;
