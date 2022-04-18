<template>
  <wooh-reports
    key="label-reports"
    type="label"
    getter-key="labels/getLabels"
    action-key="labels/get"
    :download-button-label="$t('LABEL_REPORTS.DOWNLOAD_LABEL_REPORTS')"
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
