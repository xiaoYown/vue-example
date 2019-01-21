<template>
  <div class="home">
    <!-- 商品列表 -->
    <hello-world></hello-world>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
  errorCaptured: (err) => {
    console.log(err);
  },
})
export default class Home extends Vue {}
</script>
