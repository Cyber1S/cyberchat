<template>
  <wooh-reports
    key="agent-reports"
    type="agent"
    getter-key="agents/getAgents"
    action-key="agents/get"
    :download-button-label="$t('REPORT.DOWNLOAD_AGENT_REPORTS')"
  />
</template>

<script>
import WoohReports from './components/WoohReports';

export default {
  components: {
    WoohReports,
  },
};
</script>
