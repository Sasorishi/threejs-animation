import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Orbit() {
  const mountRef = useRef(null); // Référence pour le conteneur du canvas

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

    // 4️⃣ Création des objets 3D
    const geometry = new THREE.DodecahedronGeometry();
    const material = new THREE.MeshLambertMaterial({ color: "#468585" });
    const dodecahedron = new THREE.Mesh(geometry, material);

    const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: "#B4B4B3" });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.y = -1.5;

    scene.add(dodecahedron);
    scene.add(box);

    // 5️⃣ Ajout d'une lumière
    const light = new THREE.SpotLight(0x006769, 100);
    light.position.set(1, 1, 1);
    scene.add(light);

    // 6️⃣ Animation
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    mountRef.current.appendChild(renderer.domElement); // Ajout du renderer au DOM

    // Control
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;

    // Animations
    const animate = () => {
      requestAnimationFrame(animate);
      dodecahedron.rotation.x += 0.01;
      dodecahedron.rotation.y += 0.01;
      box.rotation.y += 0.005;

      controls.update();
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

export default Orbit;
