<template>
  <select v-model="activeStatus" class="status--filter" @change="onTabChange()">
    <option
      v-for="(value, status) in $t('CHAT_LIST.CHAT_STATUS_FILTER_ITEMS')"
      :key="status"
      :value="status"
    >
      {{ value['TEXT'] }}
    </option>
    <option value="all">
      {{ $t('CHAT_LIST.FILTER_ALL') }}
    </option>
  </select>
</template>

<script>
import woohConstants from '../../../constants';
import eventListenerMixins from 'shared/mixins/eventListenerMixins';
import { hasPressedAltAndBKey } from 'shared/helpers/KeyboardHelpers';

export default {
  mixins: [eventListenerMixins],
  data: () => ({
    activeStatus: woohConstants.STATUS_TYPE.OPEN,
  }),
  methods: {
    handleKeyEvents(e) {
      if (hasPressedAltAndBKey(e)) {
        if (this.activeStatus === woohConstants.STATUS_TYPE.OPEN) {
          this.activeStatus = woohConstants.STATUS_TYPE.RESOLVED;
        } else if (this.activeStatus === woohConstants.STATUS_TYPE.RESOLVED) {
          this.activeStatus = woohConstants.STATUS_TYPE.PENDING;
        } else if (this.activeStatus === woohConstants.STATUS_TYPE.PENDING) {
          this.activeStatus = woohConstants.STATUS_TYPE.SNOOZED;
        } else if (this.activeStatus === woohConstants.STATUS_TYPE.SNOOZED) {
          this.activeStatus = woohConstants.STATUS_TYPE.ALL;
        } else if (this.activeStatus === woohConstants.STATUS_TYPE.ALL) {
          this.activeStatus = woohConstants.STATUS_TYPE.OPEN;
        }
      }
      this.onTabChange();
    },
    onTabChange() {
      this.$store.dispatch('setChatFilter', this.activeStatus);
      this.$emit('statusFilterChange', this.activeStatus);
    },
  },
};
</script>
