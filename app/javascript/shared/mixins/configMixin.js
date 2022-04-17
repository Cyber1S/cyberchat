export default {
  computed: {
    hostURL() {
      return window.cyber1schatConfig.hostURL;
    },
    vapidPublicKey() {
      return window.cyber1schatConfig.vapidPublicKey;
    },
    enabledLanguages() {
      return window.cyber1schatConfig.enabledLanguages;
    },
  },
};
