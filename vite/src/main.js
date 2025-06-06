import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('canvas');

// 1. Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#F0F0F0");

// 2. Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. Create a geometry
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: "#468585", emissive: "#468585" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const boxGeometry = new THREE.BoxGeometry(2, .1, 2);
const boxMaterial = new THREE.MeshBasicMaterial({ color: "#B4B4B3" });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.y = -1.5;
scene.add(boxMesh);

// 4. Create a light
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1, 1, 1);
scene.add(light);

// 5. Set up the renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 6. Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// 7. Animate the scene
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    // boxMesh.rotation.x += 0.01;
    boxMesh.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

// 8. Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 9. Start the animation loop
animate();