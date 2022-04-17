<template>
  <div class="context-menu">
    <c1chat-button
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
      <c1chat-dropdown-menu>
        <c1chat-dropdown-item v-if="showCopy">
          <c1chat-button
            variant="clear"
            size="small"
            icon="clipboard"
            @click="handleCopy"
          >
            {{ $t('CONVERSATION.CONTEXT_MENU.COPY') }}
          </c1chat-button>
        </c1chat-dropdown-item>
        <c1chat-dropdown-item>
          <c1chat-button
            variant="clear"
            color-scheme="alert"
            size="small"
            icon="delete"
            @click="handleDelete"
          >
            {{ $t('CONVERSATION.CONTEXT_MENU.DELETE') }}
          </c1chat-button>
        </c1chat-dropdown-item>
      </c1chat-dropdown-menu>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway';

import c1chatDropdownItem from 'shared/components/ui/dropdown/DropdownItem';
import c1chatDropdownMenu from 'shared/components/ui/dropdown/DropdownMenu';

export default {
  components: {
    c1chatDropdownMenu,
    c1chatDropdownItem,
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
