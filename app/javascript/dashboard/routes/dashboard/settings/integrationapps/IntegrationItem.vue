<template>
  <div class="row">
    <div class="integration--image">
      <img :src="'/dashboard/images/integrations/' + integrationLogo" />
    </div>
    <div class="column">
      <h3 class="integration--title">
        {{ integrationName }}
      </h3>
      <p class="integration--description">
        {{
          useInstallationName(
            integrationDescription,
            globalConfig.installationName
          )
        }}
      </p>
    </div>
    <div class="small-2 column button-wrap">
      <wooh-label :title="labelText" :color-scheme="labelColor" />
    </div>
    <div class="small-2 column button-wrap">
      <router-link
        :to="
          frontendURL(
            `accounts/${accountId}/settings/applications/` + integrationId
          )
        "
      >
        <wooh-button icon="settings">
          {{ $t('INTEGRATION_APPS.CONFIGURE') }}
        </wooh-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { frontendURL } from '../../../../helper/URLHelper';
import WoohLabel from 'dashboard/components/ui/Label';
import globalConfigMixin from 'shared/mixins/globalConfigMixin';

export default {
  components: {
    WoohLabel,
  },
  mixins: [globalConfigMixin],
  props: {
    integrationId: {
      type: [String, Number],
      required: true,
    },
    integrationLogo: {
      type: String,
      default: '',
    },
    integrationName: {
      type: String,
      default: '',
    },
    integrationDescription: {
      type: String,
      default: '',
    },
    integrationEnabled: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      accountId: 'getCurrentAccountId',
      globalConfig: 'globalConfig/get',
    }),
    labelText() {
      return this.integrationEnabled
        ? this.$t('INTEGRATION_APPS.STATUS.ENABLED')
        : this.$t('INTEGRATION_APPS.STATUS.DISABLED');
    },
    labelColor() {
      return this.integrationEnabled ? 'success' : 'secondary';
    },
  },
  methods: {
    frontendURL,
  },
};
</script>
