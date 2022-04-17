<template>
  <div class="card">
    <c1chat-message-editor
      v-model="noteContent"
      class="input--note"
      :placeholder="$t('NOTES.ADD.PLACEHOLDER')"
      :enable-suggestions="false"
    />
    <div class="footer">
      <c1chat-button
        color-scheme="warning"
        :title="$t('NOTES.ADD.TITLE')"
        :is-disabled="buttonDisabled"
        @click="onAdd"
      >
        {{ $t('NOTES.ADD.BUTTON') }} (⌘⏎)
      </c1chat-button>
    </div>
  </div>
</template>

<script>
import c1chatMessageEditor from 'dashboard/components/widgets/c1chatWriter/Editor';
import { hasPressedCommandAndEnter } from 'shared/helpers/KeyboardHelpers';
export default {
  components: {
    c1chatMessageEditor,
  },

  data() {
    return {
      noteContent: '',
    };
  },

  computed: {
    buttonDisabled() {
      return this.noteContent === '';
    },
  },

  mounted() {
    document.addEventListener('keydown', this.onMetaEnter);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onMetaEnter);
  },

  methods: {
    onMetaEnter(e) {
      if (hasPressedCommandAndEnter(e)) {
        e.preventDefault();
        this.onAdd();
      }
    },
    onAdd() {
      if (this.noteContent !== '') {
        this.$emit('add', this.noteContent);
      }
      this.noteContent = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.input--note {
  &::v-deep .ProseMirror-menubar {
    padding: 0;
    margin-top: var(--space-minus-small);
  }

  &::v-deep .ProseMirror-c1chat-style {
    max-height: 36rem;
  }
}

.footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>
