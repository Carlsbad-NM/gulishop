<template>
  <div>
    <h1>EventTest组件</h1>

    <!-- 原生dom事件在html标签上就是原生的 -->
    <button @click="test1">I Love You</button>
    <!-- 原生dom事件在组件标签上是自定义事件，想要成为原生事件，必须使用.native -->
    <Event1 @click.native="test2"></Event1>

    <br />

    <!-- 自定义事件在html标签上毫无意义 -->
    <button @haha="test3">I Love You</button>
    <Event2 @click="test4" @xxx="test5"></Event2>
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from "./Event1.vue";
import Event2 from "./Event2.vue";

export default {
  name: "EventTest",

  components: {
    Event1,
    Event2,
  },

  methods: {
    test1(event) {
      console.log(event.target.innerText);
    },
    test2(event) {
      console.log(event.target.innerText);
    },
    test3() {
      console.log(111);
    },
    test4(event) {
      console.log(event);
    },
    test5(event) {
      console.log(event);
    },
  },
};
</script>
