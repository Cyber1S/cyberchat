<template>
  <c1chat-reports
    key="label-reports"
    type="label"
    getter-key="labels/getLabels"
    action-key="labels/get"
    :download-button-label="$t('LABEL_REPORTS.DOWNLOAD_LABEL_REPORTS')"
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
