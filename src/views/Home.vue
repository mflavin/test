<template>
  <div>
    <div class="home" v-if="!$parent.loading">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="When new content and url changes, should refresh with new changes!" />
    </div>
    <div else>
      Loading...
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
}
</script>
