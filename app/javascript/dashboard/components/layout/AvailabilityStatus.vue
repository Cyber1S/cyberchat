<template>
  <c1chat-dropdown-menu>
    <c1chat-dropdown-header :title="$t('SIDEBAR.SET_AVAILABILITY_TITLE')" />
    <c1chat-dropdown-item
      v-for="status in availabilityStatuses"
      :key="status.value"
      class="status-items"
    >
      <c1chat-button
        size="small"
        :color-scheme="status.disabled ? '' : 'secondary'"
        :variant="status.disabled ? 'smooth' : 'clear'"
        class-names="status-change--dropdown-button"
        @click="changeAvailabilityStatus(status.value)"
      >
        <availability-status-badge :status="status.value" />
        {{ status.label }}
      </c1chat-button>
    </c1chat-dropdown-item>
    <c1chat-dropdown-divider />
  </c1chat-dropdown-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import { mixin as clickaway } from 'vue-clickaway';
import c1chatDropdownItem from 'shared/components/ui/dropdown/DropdownItem';
import c1chatDropdownMenu from 'shared/components/ui/dropdown/DropdownMenu';
import c1chatDropdownHeader from 'shared/components/ui/dropdown/DropdownHeader';
import c1chatDropdownDivider from 'shared/components/ui/dropdown/DropdownDivider';
import AvailabilityStatusBadge from '../widgets/conversation/AvailabilityStatusBadge';

const AVAILABILITY_STATUS_KEYS = ['online', 'busy', 'offline'];

export default {
  components: {
    c1chatDropdownHeader,
    c1chatDropdownDivider,
    c1chatDropdownMenu,
    c1chatDropdownItem,
    AvailabilityStatusBadge,
  },

  mixins: [clickaway],

  data() {
    return {
      isStatusMenuOpened: false,
      isUpdating: false,
    };
  },

  computed: {
    ...mapGetters({
      getCurrentUserAvailability: 'getCurrentUserAvailability',
      currentAccountId: 'getCurrentAccountId',
    }),
    availabilityDisplayLabel() {
      const availabilityIndex = AVAILABILITY_STATUS_KEYS.findIndex(
        key => key === this.currentUserAvailability
      );
      return this.$t('PROFILE_SETTINGS.FORM.AVAILABILITY.STATUSES_LIST')[
        availabilityIndex
      ];
    },
    currentUserAvailability() {
      return this.getCurrentUserAvailability;
    },
    availabilityStatuses() {
      return this.$t('PROFILE_SETTINGS.FORM.AVAILABILITY.STATUSES_LIST').map(
        (statusLabel, index) => ({
          label: statusLabel,
          value: AVAILABILITY_STATUS_KEYS[index],
          disabled:
            this.currentUserAvailability === AVAILABILITY_STATUS_KEYS[index],
        })
      );
    },
  },

  methods: {
    openStatusMenu() {
      this.isStatusMenuOpened = true;
    },
    closeStatusMenu() {
      this.isStatusMenuOpened = false;
    },
    changeAvailabilityStatus(availability) {
      const accountId = this.currentAccountId;
      if (this.isUpdating) {
        return;
      }

      this.isUpdating = true;
      this.$store
        .dispatch('updateAvailability', {
          availability: availability,
          account_id: accountId,
        })
        .finally(() => {
          this.isUpdating = false;
        });
    },
  },
};
</script>

<style lang="scss">
@import '~dashboard/assets/scss/variables';

.status {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-micro) var(--space-smaller);
}

.status-view {
  display: flex;
  align-items: baseline;

  & &--title {
    color: var(--b-600);
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
    margin-left: var(--space-small);

    &:first-letter {
      text-transform: capitalize;
    }
  }
}

.status-change {
  .dropdown-pane {
    top: -132px;
    right: var(--space-normal);
  }

  .status-items {
    display: flex;
    align-items: baseline;
  }
}
</style>
