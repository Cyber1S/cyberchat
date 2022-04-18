<template>
  <wooh-reports
    key="team-reports"
    type="team"
    getter-key="teams/getTeams"
    action-key="teams/get"
    :download-button-label="$t('TEAM_REPORTS.DOWNLOAD_TEAM_REPORTS')"
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
