<template>
  <div class='main'>
    <div class='left'>
      <PerformLayer :changeType='changeType' @parentClickMe='parentReceiveChild'/>
    </div>
    <div class='right'>
      <div @click="btnClick('last')" class='last-card'>
        <button class='left-btn'>&lt;&lt;</button>
      </div>
      <ThreeLayer :changeType='changeType' />
      <div @click="btnClick('next')" class='next-card'>
        <button class='left-btn'>&gt;&gt;</button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue';
import ThreeLayer from '@/components/three-layer/ThreeLayer.vue';
import PerformLayer from '@/components/perform-layer/PerformLayer.vue';
import tarotConfig from '@/assets/tarotConfig.json';
import {
  getRandomNum,
} from '@/utils/utils.ts';
// 转换数据为interface
const myArray: Array<TarotMsg> = JSON.parse(JSON.stringify(tarotConfig));
console.log(myArray);

// onMounted(()=>{
//   changeType.name = myArray[0].name;
//   changeType.id = myArray[0].id;
//   changeType.text = myArray[0].text;
// })

// 调整显示塔罗牌
const changeType = reactive<TarotMsg>({
  name: '',
  id: '',
  text: '',
});
const btnClick = (type: string) => {
  console.log(type);
  // 计算随机数据
  const randomNum = getRandomNum(0, 22);
  console.log(`随机数显示的卡牌为:${myArray[randomNum].name}`);
  // reactive不能一次性全部刷新
  changeType.name = myArray[randomNum].name;
  changeType.id = myArray[randomNum].id;
  changeType.text = myArray[randomNum].text;
};

const parentReceiveChild = (val:number)=>{
  console.log(val);
  //父传子
  changeType.name = myArray[val].name;
  changeType.id = myArray[val].id;
  changeType.text = myArray[val].text;
}

</script>

<style scoped lang='scss'>
.main {
  display: flex;
  width: 100%;
}

.left {
  width: 65%;
  height: 100%;
  float: left;
}

.right {
  display: flex;
  width: 35%;
  height: 100%;
  //border: 5px solid aqua;

  .last-card, .next-card {
    display: flex;
    align-items: center;
    height: 750px;
    width: 10%;
    .left-btn{
      font-size: 20px;
      border: 0;
      color: bisque;
      font-weight: bold;
      align-content: center;
      align-items: center;
      opacity:0;
      background: transparent;
      animation: jiantou 2s infinite;
      -moz-animation: jiantou 2s infinite;
      -webkit-animation: jiantou 2s infinite;
      -o-animation: jiantou 2s infinite;
    }
  }
  @keyframes jiantou{
    0%{opacity: 1;}
    /*修改要变换的属性opacity 必须在原dom中体现过该属性*/
    25%{opacity: 0;}
    50%{opacity: 1;}
    75%{opacity: 0;}
    100%{opacity: 1;}
  }
  @-moz-keyframes jiantou{
    0%{opacity: 1;}
    25%{opacity: 0;}
    50%{opacity: 1;}
    75%{opacity: 0;}
    100%{opacity: 1;}
  }
  @-webkit-keyframes jiantou{
    0%{opacity: 1;}
    25%{opacity: 0;}
    50%{opacity: 1;}
    75%{opacity: 0;}
    100%{opacity: 1;}
  }
  @-o-keyframes jiantou{
    0%{opacity: 1;}
    25%{opacity: 0;}
    50%{opacity: 1;}
    75%{opacity: 0;}
    100%{opacity: 1;}
  }
}
</style>
