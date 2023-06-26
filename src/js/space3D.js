import * as THREE from 'three';

export function addAxesHelper(scene) {
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
}

export function addGridHelper(scene) {
  const gridHelper = new THREE.GridHelper(10, 30);
  const gridMaterial = new THREE.LineBasicMaterial({ color: 0x9a3232 });
  gridHelper.material = gridMaterial;
  scene.add(gridHelper);
}
