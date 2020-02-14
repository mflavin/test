<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/nunu">Nunu</router-link>
      <h3>Clients in Active func</h3>
      <p>Still in active, just trying out new text</p>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  mounted () {
    axios
      .get('https://api.exchangeratesapi.io/latest')
      .then(response => console.log("Response, ", response.data.rates))

    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        console.log("Response, ", response.data.bpi);
        console.log("Response, ", response.data.time.updated)
      })
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
