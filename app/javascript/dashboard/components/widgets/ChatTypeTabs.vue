<template>
  <wooh-tabs :index="activeTabIndex" @change="onTabChange">
    <wooh-tabs-item
      v-for="item in items"
      :key="item.key"
      :name="item.name"
      :count="item.count"
    />
  </wooh-tabs>
</template>
<script>
import woohConstants from '../../constants';
import eventListenerMixins from 'shared/mixins/eventListenerMixins';
import { hasPressedAltAndNKey } from 'shared/helpers/KeyboardHelpers';

export default {
  mixins: [eventListenerMixins],
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: String,
      default: woohConstants.ASSIGNEE_TYPE.ME,
    },
  },
  computed: {
    activeTabIndex() {
      return this.items.findIndex(item => item.key === this.activeTab);
    },
  },
  methods: {
    handleKeyEvents(e) {
      if (hasPressedAltAndNKey(e)) {
        if (this.activeTab === woohConstants.ASSIGNEE_TYPE.ALL) {
          this.onTabChange(0);
        } else {
          this.onTabChange(this.activeTabIndex + 1);
        }
      }
    },
    onTabChange(selectedTabIndex) {
      if (this.items[selectedTabIndex].key !== this.activeTab) {
        this.$emit('chatTabChange', this.items[selectedTabIndex].key);
      }
    },
  },
};
</script>
