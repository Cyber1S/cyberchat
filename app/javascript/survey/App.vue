<template>
  <div id="app" class="c1chat-survey-wrap">
    <response />
  </div>
</template>

<script>
import Response from './views/Response.vue';

export default {
  name: 'App',
  components: {
    Response,
  },
};
</script>

<style lang="scss">
@import '~survey/assets/scss/c1chat.scss';
</style>
