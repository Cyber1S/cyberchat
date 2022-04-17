<template>
  <c1chat-reports
    key="team-reports"
    type="team"
    getter-key="teams/getTeams"
    action-key="teams/get"
    :download-button-label="$t('TEAM_REPORTS.DOWNLOAD_TEAM_REPORTS')"
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
