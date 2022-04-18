<template>
  <div class="context-menu">
    <wooh-button
      icon="more-vertical"
      class="button--delete-message"
      color-scheme="secondary"
      variant="link"
      @click="handleContextMenuClick"
    />
    <div
      v-if="isOpen"
      v-on-clickaway="handleContextMenuClick"
      class="dropdown-pane dropdown-pane--open"
      :class="`dropdown-pane--${menuPosition}`"
    >
      <wooh-dropdown-menu>
        <wooh-dropdown-item v-if="showCopy">
          <wooh-button
            variant="clear"
            size="small"
            icon="clipboard"
            @click="handleCopy"
          >
            {{ $t('CONVERSATION.CONTEXT_MENU.COPY') }}
          </wooh-button>
        </wooh-dropdown-item>
        <wooh-dropdown-item>
          <wooh-button
            variant="clear"
            color-scheme="alert"
            size="small"
            icon="delete"
            @click="handleDelete"
          >
            {{ $t('CONVERSATION.CONTEXT_MENU.DELETE') }}
          </wooh-button>
        </wooh-dropdown-item>
      </wooh-dropdown-menu>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway';

import WoohDropdownItem from 'shared/components/ui/dropdown/DropdownItem';
import WoohDropdownMenu from 'shared/components/ui/dropdown/DropdownMenu';

export default {
  components: {
    WoohDropdownMenu,
    WoohDropdownItem,
  },
  mixins: [clickaway],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    showCopy: {
      type: Boolean,
      default: false,
    },
    menuPosition: {
      type: String,
      default: 'left',
    },
  },
  methods: {
    handleContextMenuClick() {
      this.$emit('toggle', !this.isOpen);
    },
    handleCopy() {
      this.$emit('copy');
    },
    handleDelete() {
      this.$emit('delete');
    },
  },
};
</script>
<style lang="scss" scoped>
/* TDOD: Remove once MenuComponent supports postions */
.dropdown-pane {
  bottom: var(--space-medium);
}
.dropdown-pane--left {
  right: var(--space-small);
}
.dropdown-pane--right {
  left: var(--space-small);
}
</style>
