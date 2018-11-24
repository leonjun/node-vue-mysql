<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  width: 100%;
  top:0;
  bottom:0;
  
}
body{
  
margin: 0;
height: 100%;
}
html{
  margin: 0;
height: 100%;

}
</style>
