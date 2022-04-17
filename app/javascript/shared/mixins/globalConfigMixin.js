export default {
  methods: {
    useInstallationName(str = '', installationName) {
      return str.replace(/CyberChat/g, installationName);
    },
  },
};
