import Cookies from 'js-cookie';
import { IFrameHelper } from '../sdk/IFrameHelper';
import {
  getBubbleView,
  getDarkMode,
  getWidgetStyle,
} from '../sdk/settingsHelper';
import {
  computeHashForUserData,
  getUserCookieName,
  hasUserKeys,
} from '../sdk/cookieHelpers';

const runSDK = ({ baseUrl, websiteToken }) => {
  if (window.$cyber1schat) {
    return;
  }

  const cyber1schatSettings = window.cyber1schatSettings || {};
  window.$cyber1schat = {
    baseUrl,
    hasLoaded: false,
    hideMessageBubble: cyber1schatSettings.hideMessageBubble || false,
    isOpen: false,
    position: cyber1schatSettings.position === 'left' ? 'left' : 'right',
    websiteToken,
    locale: cyber1schatSettings.locale,
    type: getBubbleView(cyber1schatSettings.type),
    launcherTitle: cyber1schatSettings.launcherTitle || '',
    showPopoutButton: cyber1schatSettings.showPopoutButton || false,
    widgetStyle: getWidgetStyle(cyber1schatSettings.widgetStyle) || 'standard',
    resetTriggered: false,
    darkMode: getDarkMode(cyber1schatSettings.darkMode),

    toggle(state) {
      IFrameHelper.events.toggleBubble(state);
    },

    popoutChatWindow() {
      IFrameHelper.events.popoutChatWindow({
        baseUrl: window.$cyber1schat.baseUrl,
        websiteToken: window.$cyber1schat.websiteToken,
        locale: window.$cyber1schat.locale,
      });
    },

    setUser(identifier, user) {
      if (typeof identifier !== 'string' && typeof identifier !== 'number') {
        throw new Error('Identifier should be a string or a number');
      }

      if (!hasUserKeys(user)) {
        throw new Error(
          'User object should have one of the keys [avatar_url, email, name]'
        );
      }

      const userCookieName = getUserCookieName();
      const existingCookieValue = Cookies.get(userCookieName);
      const hashToBeStored = computeHashForUserData({ identifier, user });
      if (hashToBeStored === existingCookieValue) {
        return;
      }

      window.$cyber1schat.identifier = identifier;
      window.$cyber1schat.user = user;
      IFrameHelper.sendMessage('set-user', { identifier, user });
      Cookies.set(userCookieName, hashToBeStored, {
        expires: 365,
        sameSite: 'Lax',
      });
    },

    setCustomAttributes(customAttributes = {}) {
      if (!customAttributes || !Object.keys(customAttributes).length) {
        throw new Error('Custom attributes should have atleast one key');
      } else {
        IFrameHelper.sendMessage('set-custom-attributes', { customAttributes });
      }
    },

    deleteCustomAttribute(customAttribute = '') {
      if (!customAttribute) {
        throw new Error('Custom attribute is required');
      } else {
        IFrameHelper.sendMessage('delete-custom-attribute', {
          customAttribute,
        });
      }
    },

    setLabel(label = '') {
      IFrameHelper.sendMessage('set-label', { label });
    },

    removeLabel(label = '') {
      IFrameHelper.sendMessage('remove-label', { label });
    },

    setLocale(localeToBeUsed = 'en') {
      IFrameHelper.sendMessage('set-locale', { locale: localeToBeUsed });
    },

    reset() {
      if (window.$cyber1schat.isOpen) {
        IFrameHelper.events.toggleBubble();
      }

      Cookies.remove('cw_conversation');
      Cookies.remove(getUserCookieName());

      const iframe = IFrameHelper.getAppFrame();
      iframe.src = IFrameHelper.getUrl({
        baseUrl: window.$cyber1schat.baseUrl,
        websiteToken: window.$cyber1schat.websiteToken,
      });

      window.$cyber1schat.resetTriggered = true;
    },
  };

  IFrameHelper.createFrame({
    baseUrl,
    websiteToken,
  });
};

window.cyber1schatSDK = {
  run: runSDK,
};
