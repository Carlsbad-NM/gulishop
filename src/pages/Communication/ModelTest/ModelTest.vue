<template>
  <div>
    <h2>深入v-model</h2>
    <!-- v-model的本质 -->
    <!-- <input type="text" v-model="msg" /> -->
    <input type="text" :value="msg" @input="msg = $event.target.value" />
    <span>{{msg}}</span>
    <br />

    <!-- v-model在组件中的用法 -->
    <!-- <CustomInput :value="msg" @input="msg = $event"></CustomInput> -->
    <CustomInput v-model="msg"></CustomInput>
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from "./CustomInput.vue";
export default {
  name: "ModelTest",
  data() {
    return {
      msg: "Love you",
    };
  },
  components: {
    CustomInput,
  },
};
</script>
