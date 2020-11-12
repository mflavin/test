<template>
  <div id="app">
    <div id="nav" style="display: flex; justify-content: space-between; flex-wrap: wrap; padding-left: 0;">
      <router-link :to="{ name: 'Home' }" style="flex: 0 0 33%; padding-bottom: 35px;">
        <span style="color: lightblue; display: block;">
         Home
        </span>
      </router-link> |
      <router-link :to="{ name: 'About' }" style="flex: 0 0 33%; padding-bottom: 35px;">
        <span style="color: salmon; display: block;">
         About
        </span>
      </router-link>
      <router-link :to="{ name: 'Article' }" style="flex: 0 0 33%; padding-bottom: 35px;">
        <span style="color: steelblue; display: block;">
         Article
        </span>
      </router-link>
      <button type="button" name="button" @click="get" style="flex: 0 0 20%; margin-bottom: 35px;"><b>G</b>et!</button>
      <button type="button" name="button" @click="getGraphQL" style="flex: 0 0 20%; margin-bottom: 35px;"><b>G</b>et <b>G</b>raphQL!</button>
      <button type="button" name="button" @click="push" style="flex: 0 0 20%; margin-bottom: 35px;"><b>P</b>ush!</button>
      <button type="button" name="button" @click="fastCards" style="flex: 0 0 20%; margin-bottom: 35px;"><b>F</b>astCards!</button>
      <button type="button" name="button" @click="slowCards" style="flex: 0 0 20%; margin-bottom: 35px;"><b>S</b>lowCards!</button>
      <small style="flex: 0 0 25%;">
        <div class="get"></div>
      </small>
      <small style="flex: 0 0 25%;">
        <div class="getGraphQL"></div>
      </small>
      <small style="flex: 0 0 25%;">
        <div class="push"></div>
      </small>
    </div>
    <button id="app-update" class="app-update">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path
          d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
        />
      </svg>
    </button>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';
import { shortQuery, longQuery } from './gqlQuery'
import ApolloClient, { gql } from 'apollo-boost';

const que = gql`
  query ${shortQuery}
`;

const authToken = "eyJraWQiOiJXc0lVXC85S29yYk1maThucmVJUGZLOGkwZkxcL1ZwTkFOSGpGZlRTWlhteDA9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI1OTNiN2RlMS1jNzYxLTQ0NjktYTA2Mi1hMzEzOTY2MjgwMDgiLCJldmVudF9pZCI6IjMwYmJjNzRiLTczZGUtNDdjMS1iZjllLWIyZjI2MWIxYWViZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDM4MTU3NjksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX09kaFBORkxEUCIsImV4cCI6MTYwNTE5OTU0MywiaWF0IjoxNjA1MTk1OTQ1LCJqdGkiOiJhYjJkMmM3Yy03M2FjLTQ2NTQtYThlNC1jNmUyN2Q2MGU0YjUiLCJjbGllbnRfaWQiOiIydnQ0cXJxY2FrYmVvOXNoMGl2bGkzbGJ1aSIsInVzZXJuYW1lIjoiNTkzYjdkZTEtYzc2MS00NDY5LWEwNjItYTMxMzk2NjI4MDA4In0.k_tF5YXgbk5KCEj2SGH4ZmDvfvGB5lfiinfeQ86Yt8dImGELj10NYa8HV7zGo5YkQ4ttLajQMY8MxkHRAAAsxqqrJwHbBLqj3X87l3WTkflRW5LIHU_mBP51hho4dbWY6lGhNPftThvwsf0xGWEiVkDeTSHS8Zy-c-HBjJMXKCKh0Q-RUmnk6roj6WlzRKaP7nM1V9hkr-iwkIVVpKaSFGOXYBSEUrs25pw4REO-5Fh32sbiSOVVmn7ARH4J6dE-8Mp0c4xXdgD9W0ZzrYaJZPCMY59b0rsx9IRorQypMbk-19ARPguP6Pa2PK90TdI39lDNp50FeNtkzOnXTDcoBg";

export default {
  data: () => ({
    onLine: null,
    loading: false,
    numb: 0,
  }),
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
    getGraphQL() {
      this.getGraphQLApiCall();
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
        const d = response.data.body;
        first.innerHTML = `${d.UserId}, ${d.Id}, ${d.Title}, ${d.Body}`;
      })
      .catch(e => {
        console.error("Error... : ", e);
      })
    },
    fastCards() {
      // 860 ms
      fetch('https://run.mocky.io/v3/98d8ddc2-36e3-4884-b019-9b00120b287e')
      .then((response) => {
        console.log('response, ',response);
        response.text().then(d => {
          console.log('d ,' , d);
          alert('fastCards')
        });
      });
    },
    slowCards() {
      // 740 ms
      // fetch('https://run.mocky.io/v3/5ce711b0-6659-4b4c-88d4-1078cd62148f')
      // NOTE: Changing paths will update this, might be useful for insights
      /*
        NOTE: Ex. This json sends back a time stamp, it won't update unless you change pages/refresh
        Probably would be fine for insights
      */
      fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => {
        console.log('response, ',response);
        response.text().then(d => {
          console.log('d ,' , d);
          alert('slowCards')
        });
      });
    },
    getGraphQLApiCall() {
      // NOTE: SOURCE: https://graphqlzero.almansi.me/
      // https://fakeql.com/
      // https://fireql.dev/?url=https://fakeql.com/graphql/2c2b275c9590905d5a618ca7235f381a
      // const self = this;
      // self.loading = true;
      // const client = new ApolloClient({
      //   uri: 'https://api.graphql.jobs/'
      // });
      // client.query({ query: que}).then(resp => {
      //   const g = document.querySelector('.getGraphQL');
      //   const l = resp.data.cities.length - 2;
      //   const idx = Math.floor(Math.random() * l) + 1;
      //   console.log(resp);
      //   g.innerHTML = `
      //     <div class="blockDiv">
      //       <div class="leftDiv"> createdAt: </div>
      //       <div class="rightDiv">${JSON.stringify(resp.data.cities[idx].createdAt)} </div>
      //     </div>
      //     <div class="blockDiv">
      //       <div class="leftDiv"> updatedAt: </div>
      //       <div class="rightDiv">${JSON.stringify(resp.data.cities[idx].updatedAt)} </div>
      //     </div>
      //     <div class="blockDiv">
      //       <div class="leftDiv"> name: </div>
      //       <div class="rightDiv">${JSON.stringify(resp.data.cities[idx].name)} </div>
      //     </div>
      //     <div class="blockDiv">
      //       <div class="leftDiv"> type: </div>
      //       <div class="rightDiv">${JSON.stringify(resp.data.cities[idx].type)} </div>
      //     </div>
      //   `;
      //   self.loading = false;
      // });
      if (this.numb % 2 === 0) {
        this.lastSixtyDays();
      } else {
        this.lastNinetyDays();
      }
      this.numb++;
    },
    lastSixtyDays() {
      fetch("https://api.forms.myqsrsoft.com/templates/metrics/bc2e9ac4-1e63-486a-a78a-cf22f8ae87c8?startDate=2020-09-13&endDate=2020-11-13", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-auth-token": authToken
        },
        "referrer": "https://forms.myqsrsoft.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"useCompressedTable\":false,\"lastEvaluatedKey\":{\"PK\":\"1852ca1d-4caf-482b-b841-b038f5bf8bd6\",\"ORG_ID\":\"bc2e9ac4-1e63-486a-a78a-cf22f8ae87c8\",\"CXSK\":\"2020-10-25T08:53:00.922Z\"}}",
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
    },
    lastNinetyDays() {
      fetch("https://api.forms.myqsrsoft.com/templates/metrics/bc2e9ac4-1e63-486a-a78a-cf22f8ae87c8?startDate=2020-08-14&endDate=2020-11-13", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-auth-token": authToken
        },
        "referrer": "https://forms.myqsrsoft.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"useCompressedTable\":false,\"lastEvaluatedKey\":{\"PK\":\"bfbc3ef5-6b61-42ee-8a5f-3654149ddc70\",\"ORG_ID\":\"bc2e9ac4-1e63-486a-a78a-cf22f8ae87c8\",\"CXSK\":\"2020-09-23T15:00:34.913Z\"}}",
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
    },
  },
  // NOTE: https://designer.mocky.io/manage -- in cognito
  mounted () {
    // this.onLine = navigator.onLine;
    // axios
    //   .get('https://api.exchangeratesapi.io/latest')
    //   .then(response => console.log("Latest, ", response.data.rates))
    //
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        console.log("currentPrice, ", response.data.bpi);
        console.log("currentTime, ", response.data.time.updated)
      })

    console.log('Start of slow.');
    axios.get('https://run.mocky.io/v3/98d8ddc2-36e3-4884-b019-9b00120b287e');
    axios.get('https://run.mocky.io/v3/5ce711b0-6659-4b4c-88d4-1078cd62148f');
    console.log('End of slow.');

    // this.getGraphQLApiCall();
    // 110 ms - 140 ms no sw
    // client.query({ query: gql`
    //   query (
    //     $options: PageQueryOptions
    //   ) {
    //     posts(options: $options) {
    //       data {
    //         id
    //         title
    //       }
    //       meta {
    //         totalCount
    //       }
    //     }
    //   }
    // `}).then(console.log);
    // { "data": { "user": { ... } } }
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

.blockDiv {
  display: flex;
}
.leftDiv {
  text-align: left;
  flex: 1;
}
.rightDiv {
  text-align: right;
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
#app {
  width: 100vw;
}

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
