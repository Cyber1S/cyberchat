<template>
  <banner
    v-if="shouldShowBanner"
    class="update-banner"
    color-scheme="primary"
    :banner-message="bannerMessage"
    href-link="https://chat.cyber1s.com/docs/releases"
    :href-link-text="$t('GENERAL_SETTINGS.LEARN_MORE')"
    has-close-button
    @close="dismissUpdateBanner"
  />
</template>
<script>
import Banner from 'dashboard/components/ui/Banner.vue';
import LocalStorage from '../../helper/localStorage';
import { mapGetters } from 'vuex';
import adminMixin from 'dashboard/mixins/isAdmin';

const semver = require('semver');
const dismissedUpdates = new LocalStorage('dismissedUpdates');

export default {
  components: {
    Banner,
  },
  mixins: [adminMixin],
  props: {
    latestCyber1SChatVersion: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters({ globalConfig: 'globalConfig/get' }),
    hasAnUpdateAvailable() {
      if (!semver.valid(this.latestCyber1SChatVersion)) {
        return false;
      }
      return semver.lt(
        this.globalConfig.appVersion,
        this.latestCyber1SChatVersion
      );
    },
    bannerMessage() {
      return this.$t('GENERAL_SETTINGS.UPDATE_CYBER1SCHAT', {
        latestCyber1SChatVersion: this.latestCyber1SChatVersion,
      });
    },
    shouldShowBanner() {
      return (
        this.globalConfig.displayManifest &&
        this.hasAnUpdateAvailable &&
        !this.isVersionNotificationDismissed(this.latestCyber1SChatVersion) &&
        this.isAdmin
      );
    },
  },
  methods: {
    isVersionNotificationDismissed(version) {
      return dismissedUpdates.get().includes(version);
    },
    dismissUpdateBanner() {
      let updatedDismissedItems = dismissedUpdates.get();
      if (updatedDismissedItems instanceof Array) {
        updatedDismissedItems.push(this.latestCyber1SChatVersion);
      } else {
        updatedDismissedItems = [this.latestCyber1SChatVersion];
      }
      dismissedUpdates.store(updatedDismissedItems);
      this.latestCyber1SChatVersion = this.globalConfig.appVersion;
    },
  },
};
</script>
