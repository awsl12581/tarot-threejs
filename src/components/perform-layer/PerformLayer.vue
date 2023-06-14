<template>
  <!--  展示和点击层面-->
  <div class='area'>
    <div class='text-perform'>
      <div class='text'>{{ props.changeType.id }}</div>
      <div class='text'>{{ props.changeType.name }}</div>
    </div>
    <div>
      <div class='random-card-button'>
        <div class='button-container-1'>
          <span class='mas'>更改</span>
          <button @click='nextNumber' id='work' type='button' name='Hover'>更改</button>
        </div>
      </div>
      <!--      <div class='reset-button'>1234</div>-->
    </div>

  </div>

</template>

<script setup lang='ts'>

let num1:number = 0;

import { watch } from 'vue';

const props = defineProps<{
  changeType: TarotMsg
}>();
// 父传子
watch(props.changeType, (newProps) => {
  console.log(`newProps:${newProps.name}`);
  console.log(`newProps:${newProps.text}`);
  console.log(`newProps:${newProps.id}`);
});


const emit = defineEmits(["parentClickMe"]);
const nextNumber = () => {
  num1 = (num1 + 1) % 22;

  emit("parentClickMe", num1);
};


</script>

<style scoped lang='scss'>

@mixin button($bcolor,$url,$x1,$y1,$bor,$col) {
  background: $bcolor;
  -webkit-mask: url($url);
  mask: url($url);
  -webkit-mask-size: $x1 $y1;
  mask-size: $x1 $y1;
  border: $bor;
  color: $col;
}


.area {
  background-color: rgba(0, 0, 0, 0);
  color: white;
  width: 100%;
  height: 100%;
  padding: 5px;
  margin: 5px;
  align-content: center;
}

.text-perform {
  display: block;
  width: 100%;
  height: 375px;
  align-items: center;
  align-content: center;
  margin-left: 30%;
  margin-top: 15%;

  .text {
    display: flex;
    font-family: "Times New Roman", Times, serif;
    font-size: 100px;
    font-weight: bold;
  }
}

.random-card-button {
  display: block;
  width: 100%;

  .choice {
    margin-left: 40%;
    background: transparent;
    border: 0;
    font-size: 40px;
    align-content: center;
    align-items: center;
    align-self: center;
  }
}

.button-container-1 {
  position: relative;
  width: 100px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6vh;
  overflow: hidden;
  border: 1px solid;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 20px;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;

  button {
    width: 101%;
    height: 100%;
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;

    @include button(#c9d5e5,
      "/nature-sprite.png",
      2300%,
      100%,
      none,
      #703a3a);
    cursor: pointer;
    -webkit-animation: ani2 0.7s steps(22) forwards;
    animation: ani2 0.7s steps(22) forwards;

    &:hover {
      -webkit-animation: ani 0.7s steps(22) forwards;
      animation: ani 0.7s steps(22) forwards;
    }
  }

  .mas {
    position: absolute;
    color: #000;
    text-align: center;
    width: 101%;
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    margin-top: 17px;
    overflow: hidden;
    font-weight: bold;

  }

  @-webkit-keyframes ani {
    from {
      -webkit-mask-position: 0 0;
      mask-position: 0 0;
    }

    to {
      -webkit-mask-position: 100% 0;
      mask-position: 100% 0;
    }
  }

  @keyframes ani {
    from {
      -webkit-mask-position: 0 0;
      mask-position: 0 0;
    }

    to {
      -webkit-mask-position: 100% 0;
      mask-position: 100% 0;
    }
  }

  @-webkit-keyframes ani2 {
    from {
      -webkit-mask-position: 100% 0;
      mask-position: 100% 0;
    }

    to {
      -webkit-mask-position: 0 0;
      mask-position: 0 0;
    }
  }

  @keyframes ani2 {
    from {
      -webkit-mask-position: 100% 0;
      mask-position: 100% 0;
    }

    to {
      -webkit-mask-position: 0 0;
      mask-position: 0 0;
    }
  }

}


</style>
