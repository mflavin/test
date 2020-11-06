import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// NOTE: SOURCE: https://graphqlzero.almansi.me/
import ApolloClient, { gql } from 'apollo-boost';
const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api'
});
// 110 ms - 140 ms no sw
client.query({ query: gql`
  {
    user(id: 1) {
      id
      name
    }
  }
`}).then(console.log);
// { "data": { "user": { ... } } }

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
