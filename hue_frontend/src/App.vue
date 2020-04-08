<template>
  <!-- <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <div id="app">
      <h2>현재 상태 {{bulb_state}}</h2>  
      <button @click='turnOn'>켜기</button>
      <button @click='turnOff'>끄기</button>
  </div>
</template>

<script>
import axios from 'axios';
const hueBaseUrl = 'http://210.107.205.200:8080/api/wkcBD-lTULsGrCJ2hqZZqgeQsfathjs6zc3Rul1O/lights/10';

export default {
  name: 'App',
  data(){
    return{
      bulb_state: true
    }
  },
  methods:{
      setState(value){
        axios.get(`/api/${value}`).then(() => {
          this.bulb_state = value;
        });
      },
      turnOff(){
        console.log('turn off');
        this.setState(false);
      },
      turnOn(){
        console.log('turn on');
        this.setState(true);
      }
  },
  created(){
    const getState = async () => {
      const result = await axios.get(hueBaseUrl);
      this.bulb_state = result.data.state.on;
    }
    getState();
  },
}
</script>

<style>
</style>
