<template>
  <wooh-reports
    key="inbox-reports"
    type="inbox"
    getter-key="inboxes/getInboxes"
    action-key="inboxes/get"
    :download-button-label="$t('INBOX_REPORTS.DOWNLOAD_INBOX_REPORTS')"
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
