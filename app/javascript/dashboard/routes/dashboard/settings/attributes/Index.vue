<template>
  <div class="column content-box">
    <c1chat-button
      color-scheme="success"
      class-names="button--fixed-right-top"
      icon="add-circle"
      @click="openAddPopup()"
    >
      {{ $t('ATTRIBUTES_MGMT.HEADER_BTN_TXT') }}
    </c1chat-button>
    <custom-attribute />
    <c1chat-modal :show.sync="showAddPopup" :on-close="hideAddPopup">
      <add-attribute :on-close="hideAddPopup" />
    </c1chat-modal>
  </div>
</template>

<script>
import AddAttribute from './AddAttribute';
import CustomAttribute from './CustomAttribute';
export default {
  components: {
    AddAttribute,
    CustomAttribute,
  },
  data() {
    return {
      showAddPopup: false,
    };
  },
  methods: {
    openAddPopup() {
      this.showAddPopup = true;
    },
    hideAddPopup() {
      this.showAddPopup = false;
    },
  },
};
</script>

<style></style>
