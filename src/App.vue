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
  top:0;
  bottom: 0;
  
  width: 100%;
  
}
body{
  
margin: 0;

}
html{
  margin: 0;
height: 100%;

}
</style>
