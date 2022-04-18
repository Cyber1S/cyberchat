<template>
  <li class="sub-menu-container">
    <ul class="sub-menu-li-container">
      <wooh-dropdown-header :title="title" />
      <slot></slot>
    </ul>
  </li>
</template>
<script>
import WoohDropdownHeader from 'shared/components/ui/dropdown/DropdownHeader';

export default {
  name: 'WoohDropdownMenu',
  componentName: 'WoohDropdownMenu',

  components: {
    WoohDropdownHeader,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
.sub-menu-container {
  margin-top: var(--space-micro);
}

.sub-menu-li-container {
  margin: 0;
}
</style>
