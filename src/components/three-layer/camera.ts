import { PerspectiveCamera } from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const setCamera = (canvas: HTMLElement) => {
  // width / height
  const width = Number(canvas.style.width);
  const height = Number(canvas.style.height);

  // 初始化相机
  const camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 3.2, 11.3);

  // 初始化相机控制器
  // const controls = new OrbitControls(camera, canvas);
  // controls.update();
  return camera;
};

export {
  setCamera,
};
