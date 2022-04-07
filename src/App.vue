<template>
  <div id="nav">
    <Header />
    <div class="international-home">
      <div class="home-menu">
        <Menu />
      </div>
      <div class="home-screen">
        <router-view />
      </div>
    </div>
    <Audio />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue"; // @ is an alias to /src
import Audio from "@/components/Audio.vue"
import Menu from "@/components/menu.vue"
@Options({
  components: {
    Header,
    Audio,
    Menu
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  width: 1022px;
  height: 670px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.international-home{
  height: 538px;
  background: #ffffff;
  display: flex;
  .home-menu{
    width: 200px;
  }
  .home-screen{
    flex: 1;
    background-color: rgb(43, 43, 43);
  }
}
</style>
