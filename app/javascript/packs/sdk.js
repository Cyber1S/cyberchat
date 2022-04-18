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
  if (window.$cyberchat) {
    return;
  }

  const cyberchatSettings = window.cyberchatSettings || {};
  window.$cyberchat = {
    baseUrl,
    hasLoaded: false,
    hideMessageBubble: cyberchatSettings.hideMessageBubble || false,
    isOpen: false,
    position: cyberchatSettings.position === 'left' ? 'left' : 'right',
    websiteToken,
    locale: cyberchatSettings.locale,
    type: getBubbleView(cyberchatSettings.type),
    launcherTitle: cyberchatSettings.launcherTitle || '',
    showPopoutButton: cyberchatSettings.showPopoutButton || false,
    widgetStyle: getWidgetStyle(cyberchatSettings.widgetStyle) || 'standard',
    resetTriggered: false,
    darkMode: getDarkMode(cyberchatSettings.darkMode),

    toggle(state) {
      IFrameHelper.events.toggleBubble(state);
    },

    popoutChatWindow() {
      IFrameHelper.events.popoutChatWindow({
        baseUrl: window.$cyberchat.baseUrl,
        websiteToken: window.$cyberchat.websiteToken,
        locale: window.$cyberchat.locale,
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

      window.$cyberchat.identifier = identifier;
      window.$cyberchat.user = user;
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
      if (window.$cyberchat.isOpen) {
        IFrameHelper.events.toggleBubble();
      }

      Cookies.remove('cw_conversation');
      Cookies.remove(getUserCookieName());

      const iframe = IFrameHelper.getAppFrame();
      iframe.src = IFrameHelper.getUrl({
        baseUrl: window.$cyberchat.baseUrl,
        websiteToken: window.$cyberchat.websiteToken,
      });

      window.$cyberchat.resetTriggered = true;
    },
  };

  IFrameHelper.createFrame({
    baseUrl,
    websiteToken,
  });
};

window.cyberchatSDK = {
  run: runSDK,
};
