<template>
  <li class="sub-menu-container">
    <ul class="sub-menu-li-container">
      <c1chat-dropdown-header :title="title" />
      <slot></slot>
    </ul>
  </li>
</template>
<script>
import c1chatDropdownHeader from 'shared/components/ui/dropdown/DropdownHeader';

export default {
  name: 'c1chatDropdownMenu',
  componentName: 'c1chatDropdownMenu',

  components: {
    c1chatDropdownHeader,
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
