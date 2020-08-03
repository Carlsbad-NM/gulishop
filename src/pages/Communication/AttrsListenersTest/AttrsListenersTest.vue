<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>

    <Child xxx="yyy" :aaa="'love'" ccc="bbb" @heihei="test1" @click="test2"></Child>

    <HintButton type="danger" icon="el-icon-delete" title="删除" @heihei="test1" @click="test2"></HintButton>
    <HintButton type="warning" icon="el-icon-edit" title="修改" @heihei="test1" @click="test2"></HintButton>

    <el-button type="primary" @click="test1">测试</el-button>
    <!-- el-button组件定义的内部没有触发dblclick  但是有 click事件的触发-->
    <el-button type="primary" @dblclick.native="test2">测试2</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import Child from "@/pages/Communication/AttrsListenersTest/Child";
import HintButton from "@/pages/Communication/AttrsListenersTest/HintButton";
export default {
  name: "AttrsListenersTest",
  components: {
    Child,
    HintButton,
  },

  methods: {
    test1() {
      console.log("111");
    },
    test2() {
      console.log("222");
    },
  },
};
</script>
