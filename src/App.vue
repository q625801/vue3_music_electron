<template>
  <div id="nav">
    <Header />
    <router-view />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue"; // @ is an alias to /src

@Options({
  components: {
    Header,
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  width: 1022px;
  height: 670px;
  margin: 0 auto;
}
</style>
