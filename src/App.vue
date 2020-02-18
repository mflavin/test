<template>
  <div id="app">
    <div id="nav" style="display: flex; justify-content: space-between; flex-wrap: wrap; padding-left: 0;">
      <router-link to="/" style="flex: 0 0 33%; padding-bottom: 35px;">
        <span style="color: lightblue; display: block;">
         Home
        </span>
      </router-link> |
      <router-link to="/about" style="flex: 0 0 33%; padding-bottom: 35px;">
        <span style="color: salmon; display: block;">
         About
        </span>
      </router-link> |
      <router-link to="/article" style="flex: 0 0 33%; padding-bottom: 35px;">
        <span style="color: steelblue; display: block;">
         Article
        </span>
      </router-link>
      <small>
        <div class="get"></div>
      </small>
      <button type="button" name="button" @click="get" style="flex: 0 0 33%;"><b>G</b>et!</button>
      <button type="button" name="button" @click="getLat" style="flex: 0 0 33%;"><b>G</b>et <b>L</b>at!</button>
      <button type="button" name="button" @click="push" style="flex: 0 0 33%;"><b>P</b>ush!</button>
      <small>
        <div class="getLat"></div>
      </small>
      <small>
        <div class="push"></div>
      </small>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  methods: {
    get() {
      fetch('https://api.coindesk.com/v1/bpi/currentprice/CNY.json')
      .then((response) => {
        console.log('network -- Only, with backup');
        const data = document.querySelector('.get');
        response.text().then(d => {
          var j = JSON.parse(d).bpi.USD;
          console.log('d: ', d);
          console.log('j: ', j);
          data.innerHTML = `${j.code}, ${j.rate}, ${j.description}, ${j.rate_float}`;
        })
      });
    },
    getLat() {
      fetch('https://api.exchangeratesapi.io/latest')
      .then((response) => {
        console.log('network -- First, with backup');
        const getLat = document.querySelector('.getLat');
        response.text().then(d => {
          var j = JSON.parse(d);
          console.log('d: ', d);
          console.log('j: ', j);
          getLat.innerHTML = `${j.date}, ${j.base}, ${j.rates.CAD}, ${j.rates.USD}`;
        })
      });
    },
    push() {
      axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        body:   {
          "UserId": 117,
          "Id": 117,
          "Title": "TESTING",
          "Body": "TESTING",
        }
      })
      .then(response => {
        console.log('response: ', response);
        const first = document.querySelector('.push');
        first.innerHTML = response;
        response.text().then(d => {
          console.log('d: ', d);
        })
      })
      .catch(e => {
        console.error("Error... : ", e);
      })
    },
  },
  mounted () {
    axios
      .get('https://api.exchangeratesapi.io/latest')
      .then(response => console.log("Latest, ", response.data.rates))

    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        console.log("currentPrice, ", response.data.bpi);
        console.log("currentTime, ", response.data.time.updated)
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







/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
body {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto','Helvetica','Arial',sans-serif;
  justify-content: space-between;
  margin: 0;
  max-width: 100%;
  min-height: 100vh;
  text-align: center;
}

header {
  width: 100%;
}

ul.navbar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #2196F3;
}

ul.navbar > li > a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
}

section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 0 0 15px 0;
}

article {
  align-items: normal;
  justify-content: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  padding: 0 5% 0 5%;
  box-sizing: border-box;
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
  -ms-box-sizing:border-box;
}

footer {
  text-align: center;
  width: 100%;
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  background-color: #2296f3;
}

a {
  font-weight: 400;
  color: #2196F3;
  text-decoration: underline;
}

h1 {
  color: #444;
  font-size: 6vw;
  font-weight: 500;
  margin: 0.5em;
  width: 100%;
}

h2 {
  color: #4c4c4c;
  margin: 10px;
  padding: 0;
}

img {
  max-width: 100%;
}

p {
  color: #444;
  font-size: 1em;
  font-weight: 300;
  line-height: 1.6em;
  margin: 0 auto 1em auto;
  text-align: justify;
}

li {
  list-style-type: none;
}

.vertical-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
}

.list-title {
  margin: 10px 0;
}

.profile-icon {
  float:right;
  padding: 10px 16px
}

.column {
  width: 100%;
}

.img-container {
  padding-top: 10px;
}

.list-item {
  padding: 5px 0;
}

.footer-link {
  color: white;
}

@media (min-width: 800px) {
  .column {
     width: calc(50% - 20px);
  }

  .left {
    padding-right: 10px;
  }

  .right {
    padding-left: 10px;
  }

}

.padded {
  padding: 0 10%;
}

.back-link {
  padding-bottom: 10%;
}

</style>
