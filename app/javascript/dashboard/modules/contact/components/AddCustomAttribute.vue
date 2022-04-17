<template>
  <modal :show.sync="show" :on-close="onClose">
    <c1chat-modal-header
      :header-title="$t('CUSTOM_ATTRIBUTES.ADD.TITLE')"
      :header-content="$t('CUSTOM_ATTRIBUTES.ADD.DESC')"
    />
    <form class="row" @submit.prevent="addCustomAttribute">
      <c1chat-input
        v-model.trim="attributeName"
        :class="{ error: $v.attributeName.$error }"
        class="medium-12 columns"
        :error="attributeNameError"
        :label="$t('CUSTOM_ATTRIBUTES.FORM.NAME.LABEL')"
        :placeholder="$t('CUSTOM_ATTRIBUTES.FORM.NAME.PLACEHOLDER')"
        @input="$v.attributeName.$touch"
      />
      <c1chat-input
        v-model.trim="attributeValue"
        class="medium-12 columns"
        :label="$t('CUSTOM_ATTRIBUTES.FORM.VALUE.LABEL')"
        :placeholder="$t('CUSTOM_ATTRIBUTES.FORM.VALUE.PLACEHOLDER')"
      />
      <div class="modal-footer">
        <c1chat-button
          :is-disabled="$v.attributeName.$invalid || isCreating"
          :is-loading="isCreating"
        >
          {{ $t('CUSTOM_ATTRIBUTES.FORM.CREATE') }}
        </c1chat-button>
        <c1chat-button variant="clear" @click.prevent="onClose">
          {{ $t('CUSTOM_ATTRIBUTES.FORM.CANCEL') }}
        </c1chat-button>
      </div>
    </form>
  </modal>
</template>

<script>
import Modal from 'dashboard/components/Modal';
import alertMixin from 'shared/mixins/alertMixin';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  components: {
    Modal,
  },
  mixins: [alertMixin],
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    isCreating: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      attributeValue: '',
      attributeName: '',
    };
  },
  validations: {
    attributeName: {
      required,
      minLength: minLength(2),
    },
  },
  computed: {
    attributeNameError() {
      if (this.$v.attributeName.$error) {
        return this.$t('CUSTOM_ATTRIBUTES.FORM.NAME.ERROR');
      }
      return '';
    },
  },
  methods: {
    addCustomAttribute() {
      this.$emit('create', {
        attributeValue: this.attributeValue,
        attributeName: this.attributeName || '',
      });
      this.reset();
      this.$emit('cancel');
    },
    onClose() {
      this.reset();
      this.$emit('cancel');
    },
    reset() {
      this.attributeValue = '';
      this.attributeName = '';
    },
  },
};
</script>
