<template>
  <div class="row content-box full-height">
    <wooh-button
      color-scheme="success"
      class-names="button--fixed-right-top"
      icon="add-circle"
      @click="openAddPopup()"
    >
      {{ $t('INTEGRATION_SETTINGS.WEBHOOK.HEADER_BTN_TXT') }}
    </wooh-button>

    <div class="row">
      <div class="small-8 columns with-right-space ">
        <p
          v-if="!uiFlags.fetchingList && !records.length"
          class="no-items-error-message"
        >
          {{ $t('INTEGRATION_SETTINGS.WEBHOOK.LIST.404') }}
        </p>
        <wooh-loading-state
          v-if="uiFlags.fetchingList"
          :message="$t('INTEGRATION_SETTINGS.WEBHOOK.LOADING')"
        />

        <table
          v-if="!uiFlags.fetchingList && records.length"
          class="wooh-table"
        >
          <thead>
            <th
              v-for="thHeader in $t(
                'INTEGRATION_SETTINGS.WEBHOOK.LIST.TABLE_HEADER'
              )"
              :key="thHeader"
            >
              {{ thHeader }}
            </th>
          </thead>
          <tbody>
            <tr v-for="(webHookItem, index) in records" :key="webHookItem.id">
              <td class="webhook-link">
                {{ webHookItem.url }}
              </td>
              <td class="button-wrapper">
                <wooh-button
                  v-tooltip.top="
                    $t('INTEGRATION_SETTINGS.WEBHOOK.EDIT.BUTTON_TEXT')
                  "
                  variant="smooth"
                  size="tiny"
                  color-scheme="secondary"
                  icon="edit"
                  @click="openEditPopup(webHookItem)"
                >
                </wooh-button>
                <wooh-button
                  v-tooltip.top="
                    $t('INTEGRATION_SETTINGS.WEBHOOK.DELETE.BUTTON_TEXT')
                  "
                  variant="smooth"
                  color-scheme="alert"
                  size="tiny"
                  icon="dismiss-circle"
                  @click="openDeletePopup(webHookItem, index)"
                >
                </wooh-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="small-4 columns">
        <span
          v-html="
            useInstallationName(
              $t('INTEGRATION_SETTINGS.WEBHOOK.SIDEBAR_TXT'),
              globalConfig.installationName
            )
          "
        />
      </div>
    </div>

    <wooh-modal :show.sync="showAddPopup" :on-close="hideAddPopup">
      <new-webhook :on-close="hideAddPopup" />
    </wooh-modal>

    <wooh-modal :show.sync="showEditPopup" :on-close="hideEditPopup">
      <edit-webhook
        v-if="showEditPopup"
        :id="selectedWebHook.id"
        :url="selectedWebHook.url"
        :on-close="hideEditPopup"
      />
    </wooh-modal>

    <wooh-delete-modal
      :show.sync="showDeleteConfirmationPopup"
      :on-close="closeDeletePopup"
      :on-confirm="confirmDeletion"
      :title="$t('INTEGRATION_SETTINGS.WEBHOOK.DELETE.CONFIRM.TITLE')"
      :message="$t('INTEGRATION_SETTINGS.WEBHOOK.DELETE.CONFIRM.MESSAGE')"
      :confirm-text="$t('INTEGRATION_SETTINGS.WEBHOOK.DELETE.CONFIRM.YES')"
      :reject-text="$t('INTEGRATION_SETTINGS.WEBHOOK.DELETE.CONFIRM.NO')"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import NewWebhook from './NewWebHook';
import EditWebhook from './EditWebHook';
import alertMixin from 'shared/mixins/alertMixin';
import globalConfigMixin from 'shared/mixins/globalConfigMixin';

export default {
  components: {
    NewWebhook,
    EditWebhook,
  },
  mixins: [alertMixin, globalConfigMixin],
  data() {
    return {
      loading: {},
      showAddPopup: false,
      showEditPopup: false,
      showDeleteConfirmationPopup: false,
      selectedWebHook: {},
    };
  },
  computed: {
    ...mapGetters({
      records: 'webhooks/getWebhooks',
      uiFlags: 'webhooks/getUIFlags',
      globalConfig: 'globalConfig/get',
    }),
  },
  mounted() {
    this.$store.dispatch('webhooks/get');
  },
  methods: {
    openAddPopup() {
      this.showAddPopup = true;
    },
    hideAddPopup() {
      this.showAddPopup = false;
    },
    openDeletePopup(response) {
      this.showDeleteConfirmationPopup = true;
      this.selectedWebHook = response;
    },
    closeDeletePopup() {
      this.showDeleteConfirmationPopup = false;
    },
    openEditPopup(webhook) {
      this.showEditPopup = true;
      this.selectedWebHook = webhook;
    },
    hideEditPopup() {
      this.showEditPopup = false;
    },
    confirmDeletion() {
      this.loading[this.selectedWebHook.id] = true;
      this.closeDeletePopup();
      this.deleteWebhook(this.selectedWebHook.id);
    },
    async deleteWebhook(id) {
      try {
        await this.$store.dispatch('webhooks/delete', id);
        this.showAlert(
          this.$t('INTEGRATION_SETTINGS.WEBHOOK.DELETE.API.SUCCESS_MESSAGE')
        );
      } catch (error) {
        this.showAlert(
          this.$t('INTEGRATION_SETTINGS.WEBHOOK.DELETE.API.ERROR_MESSAGE')
        );
      }
    },
  },
};
</script>
<style scoped lang="scss">
.webhook-link {
  word-break: break-word;
}
.button-wrapper button:nth-child(2) {
  margin-left: var(--space-normal);
}
</style>
