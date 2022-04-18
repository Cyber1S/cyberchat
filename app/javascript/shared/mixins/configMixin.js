export default {
  computed: {
    hostURL() {
      return window.cyberchatConfig.hostURL;
    },
    vapidPublicKey() {
      return window.cyberchatConfig.vapidPublicKey;
    },
    enabledLanguages() {
      return window.cyberchatConfig.enabledLanguages;
    },
  },
};
