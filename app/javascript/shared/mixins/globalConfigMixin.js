export default {
  methods: {
    useInstallationName(str = '', installationName) {
      return str.replace(/Cyberchat/g, installationName);
    },
  },
};
