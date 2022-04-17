<template>
  <c1chat-reports
    key="inbox-reports"
    type="inbox"
    getter-key="inboxes/getInboxes"
    action-key="inboxes/get"
    :download-button-label="$t('INBOX_REPORTS.DOWNLOAD_INBOX_REPORTS')"
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
