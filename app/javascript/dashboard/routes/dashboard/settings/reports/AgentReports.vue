<template>
  <c1chat-reports
    key="agent-reports"
    type="agent"
    getter-key="agents/getAgents"
    action-key="agents/get"
    :download-button-label="$t('REPORT.DOWNLOAD_AGENT_REPORTS')"
  />
</template>

<script>
import c1chatReports from './components/c1chatReports';

export default {
  components: {
    c1chatReports,
  },
};
</script>
