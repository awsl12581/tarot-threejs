import { AmbientLight, Scene, SpotLight, SpotLightHelper } from 'three';

const setLights = (scene: Scene, isNeedHelper: boolean) => {
  // 灯光
  const light1 = new AmbientLight(0x404040); // 柔和的白光
  scene.add(light1);
  // const light2 = new DirectionalLight(0xffffff, 1);
  // light2.position.set(0, 10, 10)
  // light2.lookAt(0, 0, 0)
  // scene.add(light2);
  // Create a PointLight and turn on shadows for the light
  const light = new SpotLight(0xffffff, 5, 50, Math.PI / 6);
  light.position.set(0, 20, 20);
  light.castShadow = true; // default false
  scene.add(light);
  // Set up shadow properties for the light
  light.shadow.mapSize.width = 2048; // default
  light.shadow.mapSize.height = 2048; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 50; // default

  if (isNeedHelper) {
    const pointLightHelper = new SpotLightHelper(light, 1);
    scene.add(pointLightHelper);
  }
};

export {
  setLights,
};
