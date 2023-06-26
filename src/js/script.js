import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    15,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const orbit = new OrbitControls(camera, renderer.domElement)
const exesHelper = new THREE.AxesHelper(5);

camera.position.set(0, 2, 5)
orbit.update()
const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FF00,
    side: THREE.DoubleSide
})
const box = new THREE.Mesh(boxGeometry, boxMaterial);
const gridHelper = new THREE.GridHelper(10, 30)

// luoi cau
const sphereGeometry = new THREE.SphereGeometry(1, 50, 50)
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xEA9999,
    wireframe: true
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xA3A3A3 })
const plene = new THREE.Mesh(planeGeometry, planeMaterial);

// scene.add(plene)
plene.rotation.x = -0.5 * Math.PI
scene.add(exesHelper)
scene.add(box)
scene.add(gridHelper)

function animate(time) {
    box.rotation.x += 0.02;
    box.rotation.y += 0.02;
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate);