<template>
  <div>
    小明的爸爸现在有{{money}}元
    <h2>不使用sync修改符</h2>
    <!-- <Child :money="money" @spendMoney="spendMoney"></Child> -->
    <!-- sync本质上也是绑定一个事件 但是事件名字是固定的-->
    <Child :money="money" @update:money="spendMoney"></Child>
    <br />

    <h2>使用sync修改符</h2>
    <child2 :money.sync="money"></child2>

    <h2>使用v-model修改符</h2>
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import Child from "./Child.vue";
import Child2 from "./Child2.vue";
export default {
  name: "SyncTest",
  data() {
    return {
      money: 1000,
    };
  },
  components: {
    Child,
    Child2,
  },
  methods: {
    spendMoney(money) {
      this.money = money;
    },
  },
};
</script>
