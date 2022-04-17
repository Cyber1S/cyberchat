<template>
  <transition name="menu-slide">
    <div
      v-if="show"
      v-on-clickaway="onClickAway"
      class="dropdown-pane"
      :class="{ 'dropdown-pane--open': show }"
    >
      <availability-status />
      <li class="divider" />
      <c1chat-dropdown-menu>
        <c1chat-dropdown-item v-if="showChangeAccountOption">
          <c1chat-button
            variant="clear"
            color-scheme="secondary"
            size="small"
            icon="arrow-swap"
            @click="$emit('toggle-accounts')"
          >
            {{ $t('SIDEBAR_ITEMS.CHANGE_ACCOUNTS') }}
          </c1chat-button>
        </c1chat-dropdown-item>
        <c1chat-dropdown-item v-if="globalConfig.cyber1schatInboxToken">
          <c1chat-button
            variant="clear"
            color-scheme="secondary"
            size="small"
            icon="chat-help"
            @click="$emit('show-support-chat-window')"
          >
            {{ $t('SIDEBAR_ITEMS.CONTACT_SUPPORT') }}
          </c1chat-button>
        </c1chat-dropdown-item>
        <c1chat-dropdown-item>
          <c1chat-button
            variant="clear"
            color-scheme="secondary"
            size="small"
            icon="keyboard"
            @click="handleKeyboardHelpClick"
          >
            {{ $t('SIDEBAR_ITEMS.KEYBOARD_SHORTCUTS') }}
          </c1chat-button>
        </c1chat-dropdown-item>
        <c1chat-dropdown-item>
          <router-link
            v-slot="{ href, isActive, navigate }"
            :to="`/app/accounts/${accountId}/profile/settings`"
            custom
          >
            <a
              :href="href"
              class="button small clear secondary"
              :class="{ 'is-active': isActive }"
              @click="e => handleProfileSettingClick(e, navigate)"
            >
              <fluent-icon icon="person" size="14" class="icon icon--font" />
              <span class="button__content">
                {{ $t('SIDEBAR_ITEMS.PROFILE_SETTINGS') }}
              </span>
            </a>
          </router-link>
        </c1chat-dropdown-item>
        <c1chat-dropdown-item>
          <c1chat-button
            variant="clear"
            color-scheme="secondary"
            size="small"
            icon="power"
            @click="logout"
          >
            {{ $t('SIDEBAR_ITEMS.LOGOUT') }}
          </c1chat-button>
        </c1chat-dropdown-item>
      </c1chat-dropdown-menu>
    </div>
  </transition>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import { mapGetters } from 'vuex';
import Auth from '../../../api/auth';
import c1chatDropdownItem from 'shared/components/ui/dropdown/DropdownItem';
import c1chatDropdownMenu from 'shared/components/ui/dropdown/DropdownMenu';
import AvailabilityStatus from 'dashboard/components/layout/AvailabilityStatus';

export default {
  components: {
    c1chatDropdownMenu,
    c1chatDropdownItem,
    AvailabilityStatus,
  },
  mixins: [clickaway],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
      globalConfig: 'globalConfig/get',
      accountId: 'getCurrentAccountId',
    }),
    showChangeAccountOption() {
      if (this.globalConfig.createNewAccountFromDashboard) {
        return true;
      }

      const { accounts = [] } = this.currentUser;
      return accounts.length > 1;
    },
  },
  methods: {
    handleProfileSettingClick(e, navigate) {
      this.$emit('close');
      navigate(e);
    },
    handleKeyboardHelpClick() {
      this.$emit('key-shortcut-modal');
      this.$emit('close');
    },
    logout() {
      Auth.logout();
    },
    onClickAway() {
      if (this.show) this.$emit('close');
    },
  },
};
</script>
<style lang="scss" scoped>
.dropdown-pane {
  left: var(--space-slab);
  bottom: var(--space-larger);
  min-width: 16.8rem;
  z-index: var(--z-index-much-higher);
}
</style>
