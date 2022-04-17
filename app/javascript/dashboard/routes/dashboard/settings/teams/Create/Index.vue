<template>
  <div class="row content-box full-height">
    <c1chat-wizard class="small-3 columns" :items="items" />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      const data = this.$t('TEAMS_SETTINGS.CREATE_FLOW.WIZARD');
      return data;
    },
  },
};
</script>
