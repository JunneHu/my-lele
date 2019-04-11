<template>
  <div class="app-container">
    <transition name="slide-left">
      <router-view class="child-view" />
    </transition>
    <my-footer />
  </div>
</template>

<script>
import myFooter from "@/components/footer.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    "my-footer": myFooter
  },
  computed: {},
  watch: {},
  methods: {
    onClickLeft() {}
  }
};
</script>

<style lang="less" scoped>
.app-container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
}
.child-view {  
  position: absolute;  
  left: 0;  
  top: 0;  
  width: 100%;   
  height: 100%;
  overflow-y: scroll;
  background-color: #f7f7f7;
  transition: all .5s cubic-bezier(.55,0,.1,1); 
} 
.slide-left-enter, .slide-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(30px, 0);  
  transform: translate(30px, 0);  
}  
.slide-left-leave-active, .slide-right-enter {  
  opacity: 0;  
  -webkit-transform: translate(-30px, 0);  
  transform: translate(-30px, 0);  
}
</style>