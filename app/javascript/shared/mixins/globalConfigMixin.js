export default {
  methods: {
    useInstallationName(str = '', installationName) {
      return str.replace(/Cyber1SChat/g, installationName);
    },
  },
};
