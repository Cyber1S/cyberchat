import posthog from 'posthog-js';

export const CYBERCHAT_SET_USER = 'CYBERCHAT_SET_USER';
export const CYBERCHAT_RESET = 'CYBERCHAT_RESET';

export const ANALYTICS_IDENTITY = 'ANALYTICS_IDENTITY';
export const ANALYTICS_RESET = 'ANALYTICS_RESET';

export const initializeAnalyticsEvents = () => {
  window.bus.$on(ANALYTICS_IDENTITY, ({ user }) => {
    if (window.analyticsConfig) {
      posthog.identify(user.id, { name: user.name, email: user.email });
    }
  });

  window.bus.$on(ANALYTICS_RESET, () => {
    if (window.analyticsConfig) {
      posthog.reset();
    }
  });
};

export const initializeCyberchatEvents = () => {
  window.bus.$on(CYBERCHAT_RESET, () => {
    if (window.$cyberchat) {
      window.$cyberchat.reset();
    }
  });
  window.bus.$on(CYBERCHAT_SET_USER, ({ user }) => {
    if (window.$cyberchat) {
      window.$cyberchat.setUser(user.email, {
        avatar_url: user.avatar_url,
        email: user.email,
        identifier_hash: user.hmac_identifier,
        name: user.name,
      });
      window.$cyberchat.setCustomAttributes({
        signedUpAt: user.created_at,
        cloudCustomer: 'true',
      });
    }
  });
};
