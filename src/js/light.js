import * as THREE from 'three';

// anh sang san khau
export function addSpotLight(scene) {
  const spotLight = new THREE.SpotLight(0xFFFFFD);
  spotLight.position.set(-100, 100, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
}

// anh sang xung quanh
// export function addAmbientLight() {
//   const ambientLight = new THREE.AmbientLight(0xcce090)
//   scene.add(ambientLight);
//   const directionalLight = new THREE.DirectionalLight(0xFFFFFD, 0.8)
//   scene.add(directionalLight);
//   directionalLight.position.set(-35, 50, 0)
//   directionalLight.castShadow = true; // bong
//   // directionalLight.shadow.camera.bottom = -12; // bong
//   const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
//   scene.add(dLightHelper);
// }