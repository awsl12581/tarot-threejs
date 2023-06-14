<script setup lang='ts'>

import { onMounted, reactive, watch } from 'vue';
import {
  BoxGeometry,
  Clock,
  Mesh,
  PCFShadowMap, PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { setCamera } from '@/components/three-layer/camera.ts';
import { setScene } from '@/components/three-layer/scene.ts';
import { setLights } from '@/components/three-layer/light.ts';
import { setTarot } from '@/components/three-layer/tarot.ts';
import { setReSize } from '@/components/three-layer/resize.ts';
import { setFloor } from '@/components/three-layer/floor.ts';
import { disposeCardMesh } from '@/utils/utils.ts';
import { getOrbit } from '@/components/three-layer/orbit.ts';
import { Flow } from 'three/examples/jsm/modifiers/CurveModifier';

// 现有卡面
let tarotCard: Mesh<BoxGeometry, any[]>;
let tarotCardMove: boolean;
// 现有场景
let tarotScene: Scene;

let tarotOrbit: Flow;

let tarotOrbitMesh: Mesh;

let tarotCamera: PerspectiveCamera;


onMounted(() => {
  console.log('加载three');
  const canvas = document.getElementById('c2d') as HTMLElement;
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    logarithmicDepthBuffer: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.useLegacyLights = true;
  renderer.shadowMap.type = PCFShadowMap;
  // 像素比
  renderer.setPixelRatio(window.devicePixelRatio);
  // 初始化相机
  const camera = setCamera(canvas);
  tarotCamera = camera;
  // 场景
  const scene = setScene();
  tarotScene = scene;
  // 地板
  setFloor(scene);
  // 灯光
  setLights(scene, false);
  // 基坐标辅助
  // const axesHelper = new AxesHelper(150);
  // scene.add(axesHelper);
  // 插入塔罗牌
  tarotCard = setTarot(scene);
  tarotCardMove = true;
  // 插入轨道
  getOrbit(tarotScene, (flow:Flow, mesh:Mesh) => {
    tarotOrbit = flow;
    tarotOrbitMesh = mesh;
  });

  // Clock
  const clock = new Clock();

  function render() {
    if (tarotCard && tarotCardMove) {
      // 两次调用时间间隔
      const delta = clock.getDelta();
      tarotCard.rotation.y += delta;
      // 总时间间隔
      const elapsed = clock.getElapsedTime();
      tarotCard.position.y = 4 + Math.sin(elapsed) * (1 / 5);
    }
    if (tarotOrbit) {
      tarotOrbit.moveAlongCurve(0.001);
    }
    // 渲染
    renderer.render(scene, camera);
    // 动画
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
  // 重新设置窗口
  setReSize(canvas, camera, renderer);
  window.addEventListener('resize', () => {
    console.log('窗口大小发生改变');
    // set the size again if a resize occurs
    setReSize(canvas, camera, renderer);
  }, false);
});

const props = defineProps<{
  changeType: TarotMsg
}>();
// 父传子
watch(props.changeType, (newProps) => {
  console.log(`newProps:${newProps.name}`);
  console.log(`newProps:${newProps.text}`);
  console.log(`newProps:${newProps.id}`);
  // 根据更新刷新卡面
  // 销毁旧有卡面
  disposeCardMesh(tarotScene, tarotCard, tarotOrbit, tarotOrbitMesh);
  // 添加新卡面,修改全局
  tarotCard = setTarot(tarotScene, newProps);
  tarotCardMove = true;
  getOrbit(tarotScene, (flow:Flow, mesh:Mesh) => {
    tarotOrbit = flow;
    tarotOrbitMesh = mesh;
  }, newProps);
  // const flow = getOrbit(tarotScene,newProps);
});


const mouseData = reactive<{
  startPoint: {
    x: number,
    y: number,
  },
  endPoint: {
    x: number,
    y: number,
  },
  moveFlag: boolean
}>({
  startPoint: {
    x: 0,
    y: 0,
  },
  endPoint: {
    x: 0,
    y: 0,
  },
  moveFlag: false,
});
const getMouseDown = () => {
  mouseData.startPoint.x = 0;
  mouseData.startPoint.y = 0;
  mouseData.endPoint.x = 0;
  mouseData.endPoint.y = 0;
  mouseData.moveFlag = true;
  let event;				// 浏览器事件记录起始位置
  event = event || window.event as MouseEvent;
  if (event){
    mouseData.startPoint.x = event.pageX;
    mouseData.startPoint.y = event.pageY;
  }

};

const getMouseMove = () => {
  if (mouseData.moveFlag) {
    tarotCardMove = false;
    let event;
    event = event || window.event as MouseEvent;
    if (!event){
      return
    }
    mouseData.endPoint.y = event.pageY;
    mouseData.endPoint.x = event.pageX;
    let numLeft = mouseData.endPoint.x - mouseData.startPoint.x;
    let numTop = mouseData.endPoint.y - mouseData.startPoint.y;
    //绕y旋转，缓动效果
    if (numLeft > 10 && numLeft > numTop) {
      // tarotCard.rotation.y = tarotCard.rotation.y + 0.01;
      tarotCard.rotateOnAxis(new Vector3(0, 1, 0), Math.PI / 256);
    } else if (numLeft < -10 && numLeft < numTop) {
      tarotCard.rotateOnAxis(new Vector3(0, 1, 0), -Math.PI / 256);
      // tarotCard.rotation.y = tarotCard.rotation.y - 0.01;
    }

    //绕自身对称轴旋转y~=4
    if (numTop > 10 && numTop > numLeft) {
      tarotCard.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 256);
      console.log(`物体位置坐标：${tarotCard.position.x}:${tarotCard.position.y}:${tarotCard.position.z}`);
    } else if (numTop < -10 && numTop < numLeft) {
      tarotCard.rotateOnAxis(new Vector3(1, 0, 0), -Math.PI / 256);
    }
    console.log(`移动过程:${numTop}:${numLeft}`);
    //缓动效果
  }

};

// 鼠标抬起 计算提示弹窗的位置
const getMouseUp = () => {
  let event;
  event = event || window.event as MouseEvent;
  if (!event){
    return;
  }
  mouseData.endPoint.y = event.pageY;
  mouseData.endPoint.x = event.pageX;
  let numLeft = mouseData.endPoint.x - mouseData.startPoint.x;
  let numTop = mouseData.endPoint.y - mouseData.startPoint.y;
  console.log(`${numTop}:${numLeft}`);
  mouseData.moveFlag = false;
};

const getMouseWheel = (event: WheelEvent) => {
  event.preventDefault();
  let scale = 0;
  scale = event.deltaY * -0.01;
  console.log('滚轮缩放倍数：' + scale);
  tarotCamera.position.z = tarotCamera.position.z-scale
};

</script>

<template>
  <div id='move'
       @mousedown.stop='getMouseDown'
       @mousemove.stop='mouseData.moveFlag && getMouseMove()'
       @mouseup.stop='getMouseUp'
       @wheel.stop='getMouseWheel'
  >
    <canvas id='c2d' class='c2d' />
  </div>

</template>

<style scoped>
/*canvas需要写死*/
.c2d {
  width: 100%;
  height: 750px;
  margin: 0 auto;
}

#move {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
