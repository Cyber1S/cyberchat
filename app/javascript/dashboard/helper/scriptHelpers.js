import posthog from 'posthog-js';

export const CYBER1SCHAT_SET_USER = 'CYBER1SCHAT_SET_USER';
export const CYBER1SCHAT_RESET = 'CYBER1SCHAT_RESET';

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

export const initializeCyberChatEvents = () => {
  window.bus.$on(CYBER1SCHAT_RESET, () => {
    if (window.$cyber1schat) {
      window.$cyber1schat.reset();
    }
  });
  window.bus.$on(CYBER1SCHAT_SET_USER, ({ user }) => {
    if (window.$cyber1schat) {
      window.$cyber1schat.setUser(user.email, {
        avatar_url: user.avatar_url,
        email: user.email,
        identifier_hash: user.hmac_identifier,
        name: user.name,
      });
      window.$cyber1schat.setCustomAttributes({
        signedUpAt: user.created_at,
        cloudCustomer: 'true',
      });
    }
  });
};
