import Cookies from 'js-cookie';
import {
  woohOn,
  addClass,
  loadCSS,
  removeClass,
  onLocationChangeListener,
} from './DOMHelpers';
import {
  body,
  widgetHolder,
  createBubbleHolder,
  createBubbleIcon,
  bubbleImg,
  chatBubble,
  closeBubble,
  bubbleHolder,
  createNotificationBubble,
  onClickChatBubble,
  onBubbleClick,
  setBubbleText,
  addUnreadClass,
  removeUnreadClass,
} from './bubbleHelpers';
import { dispatchWindowEvent } from 'shared/helpers/CustomEventHelper';
import { CYBERCHAT_ERROR, CYBERCHAT_READY } from '../widget/constants/sdkEvents';
import { SET_USER_ERROR } from '../widget/constants/errorTypes';
import { getUserCookieName } from './cookieHelpers';
import {
  getAlertAudio,
  initOnEvents,
} from 'shared/helpers/AudioNotificationHelper';
import { isFlatWidgetStyle } from './settingsHelper';
import { popoutChatWindow } from '../widget/helpers/popoutHelper';

export const IFrameHelper = {
  getUrl({ baseUrl, websiteToken }) {
    return `${baseUrl}/widget?website_token=${websiteToken}`;
  },
  createFrame: ({ baseUrl, websiteToken }) => {
    if (IFrameHelper.getAppFrame()) {
      return;
    }

    loadCSS();
    const iframe = document.createElement('iframe');
    const cwCookie = Cookies.get('cw_conversation');
    let widgetUrl = IFrameHelper.getUrl({ baseUrl, websiteToken });
    if (cwCookie) {
      widgetUrl = `${widgetUrl}&cw_conversation=${cwCookie}`;
    }
    iframe.src = widgetUrl;

    iframe.id = 'cyberchat_live_chat_widget';
    iframe.style.visibility = 'hidden';

    let holderClassName = `wooh-widget-holder wooh--hide wooh-elements--${window.$cyberchat.position}`;
    if (window.$cyberchat.hideMessageBubble) {
      holderClassName += ` wooh-widget--without-bubble`;
    }
    if (isFlatWidgetStyle(window.$cyberchat.widgetStyle)) {
      holderClassName += ` wooh-widget-holder--flat`;
    }

    addClass(widgetHolder, holderClassName);
    widgetHolder.appendChild(iframe);
    body.appendChild(widgetHolder);
    IFrameHelper.initPostMessageCommunication();
    IFrameHelper.initWindowSizeListener();
    IFrameHelper.preventDefaultScroll();
  },
  getAppFrame: () => document.getElementById('cyberchat_live_chat_widget'),
  getBubbleHolder: () => document.getElementsByClassName('wooh--bubble-holder'),
  sendMessage: (key, value) => {
    const element = IFrameHelper.getAppFrame();
    element.contentWindow.postMessage(
      `cyberchat-widget:${JSON.stringify({ event: key, ...value })}`,
      '*'
    );
  },
  initPostMessageCommunication: () => {
    window.onmessage = e => {
      if (
        typeof e.data !== 'string' ||
        e.data.indexOf('cyberchat-widget:') !== 0
      ) {
        return;
      }
      const message = JSON.parse(e.data.replace('cyberchat-widget:', ''));
      if (typeof IFrameHelper.events[message.event] === 'function') {
        IFrameHelper.events[message.event](message);
      }
    };
  },
  initWindowSizeListener: () => {
    woohOn(window, 'resize', () => IFrameHelper.toggleCloseButton());
  },
  preventDefaultScroll: () => {
    widgetHolder.addEventListener('wheel', event => {
      const deltaY = event.deltaY;
      const contentHeight = widgetHolder.scrollHeight;
      const visibleHeight = widgetHolder.offsetHeight;
      const scrollTop = widgetHolder.scrollTop;

      if (
        (scrollTop === 0 && deltaY < 0) ||
        (visibleHeight + scrollTop === contentHeight && deltaY > 0)
      ) {
        event.preventDefault();
      }
    });
  },

  setFrameHeightToFitContent: (extraHeight, isFixedHeight) => {
    const iframe = IFrameHelper.getAppFrame();
    const updatedIframeHeight = isFixedHeight ? `${extraHeight}px` : '100%';

    if (iframe)
      iframe.setAttribute('style', `height: ${updatedIframeHeight} !important`);
  },

  setupAudioListeners: () => {
    const { baseUrl = '' } = window.$cyberchat;
    getAlertAudio(baseUrl).then(() =>
      initOnEvents.forEach(event => {
        document.removeEventListener(
          event,
          IFrameHelper.setupAudioListeners,
          false
        );
      })
    );
  },

  events: {
    loaded: message => {
      Cookies.set('cw_conversation', message.config.authToken, {
        expires: 365,
        sameSite: 'Lax',
      });
      window.$cyberchat.hasLoaded = true;
      IFrameHelper.sendMessage('config-set', {
        locale: window.$cyberchat.locale,
        position: window.$cyberchat.position,
        hideMessageBubble: window.$cyberchat.hideMessageBubble,
        showPopoutButton: window.$cyberchat.showPopoutButton,
        widgetStyle: window.$cyberchat.widgetStyle,
        darkMode: window.$cyberchat.darkMode,
      });
      IFrameHelper.onLoad({
        widgetColor: message.config.channelConfig.widgetColor,
      });
      IFrameHelper.toggleCloseButton();

      if (window.$cyberchat.user) {
        IFrameHelper.sendMessage('set-user', window.$cyberchat.user);
      }

      window.playAudioAlert = () => {};

      initOnEvents.forEach(e => {
        document.addEventListener(e, IFrameHelper.setupAudioListeners, false);
      });

      if (!window.$cyberchat.resetTriggered) {
        dispatchWindowEvent({ eventName: CYBERCHAT_READY });
      }
    },
    error: ({ errorType, data }) => {
      dispatchWindowEvent({ eventName: CYBERCHAT_ERROR, data: data });

      if (errorType === SET_USER_ERROR) {
        Cookies.remove(getUserCookieName());
      }
    },

    setBubbleLabel(message) {
      if (window.$cyberchat.hideMessageBubble) {
        return;
      }
      setBubbleText(window.$cyberchat.launcherTitle || message.label);
    },

    toggleBubble: state => {
      let bubbleState = {};
      if (state === 'open') {
        bubbleState.toggleValue = true;
      } else if (state === 'close') {
        bubbleState.toggleValue = false;
      }

      onBubbleClick(bubbleState);
    },

    popoutChatWindow: ({ baseUrl, websiteToken, locale }) => {
      const cwCookie = Cookies.get('cw_conversation');
      window.$cyberchat.toggle('close');
      popoutChatWindow(baseUrl, websiteToken, locale, cwCookie);
    },

    closeWindow: () => {
      onBubbleClick({ toggleValue: false });
      removeUnreadClass();
    },

    onBubbleToggle: isOpen => {
      IFrameHelper.sendMessage('toggle-open', { isOpen });
      if (isOpen) {
        IFrameHelper.pushEvent('webwidget.triggered');
      }
    },
    onLocationChange: ({ referrerURL, referrerHost }) => {
      IFrameHelper.sendMessage('change-url', {
        referrerURL,
        referrerHost,
      });
    },
    updateIframeHeight: message => {
      const { extraHeight = 0, isFixedHeight } = message;

      IFrameHelper.setFrameHeightToFitContent(extraHeight, isFixedHeight);
    },

    setUnreadMode: () => {
      addUnreadClass();
      onBubbleClick({ toggleValue: true });
    },

    resetUnreadMode: () => removeUnreadClass(),
    handleNotificationDot: event => {
      if (window.$cyberchat.hideMessageBubble) {
        return;
      }

      const bubbleElement = document.querySelector('.wooh-widget-bubble');
      if (
        event.unreadMessageCount > 0 &&
        !bubbleElement.classList.contains('unread-notification')
      ) {
        addClass(bubbleElement, 'unread-notification');
      } else if (event.unreadMessageCount === 0) {
        removeClass(bubbleElement, 'unread-notification');
      }
    },

    closeChat: () => {
      onBubbleClick({ toggleValue: false });
    },

    playAudio: () => {
      window.playAudioAlert();
    },
  },
  pushEvent: eventName => {
    IFrameHelper.sendMessage('push-event', { eventName });
  },

  onLoad: ({ widgetColor }) => {
    const iframe = IFrameHelper.getAppFrame();
    iframe.style.visibility = '';
    iframe.setAttribute('id', `cyberchat_live_chat_widget`);

    if (IFrameHelper.getBubbleHolder().length) {
      return;
    }
    createBubbleHolder();
    onLocationChangeListener();
    if (!window.$cyberchat.hideMessageBubble) {
      let className = 'wooh-widget-bubble';
      let closeBtnClassName = `wooh-elements--${window.$cyberchat.position} wooh-widget-bubble wooh--close wooh--hide`;

      if (isFlatWidgetStyle(window.$cyberchat.widgetStyle)) {
        className += ' wooh-widget-bubble--flat';
        closeBtnClassName += ' wooh-widget-bubble--flat';
      }

      const chatIcon = createBubbleIcon({
        className,
        src: bubbleImg,
        target: chatBubble,
      });

      addClass(closeBubble, closeBtnClassName);

      chatIcon.style.background = widgetColor;
      closeBubble.style.background = widgetColor;

      bubbleHolder.appendChild(chatIcon);
      bubbleHolder.appendChild(closeBubble);
      bubbleHolder.appendChild(createNotificationBubble());
      onClickChatBubble();
    }
  },
  toggleCloseButton: () => {
    let isMobile = false;
    if (window.matchMedia('(max-width: 668px)').matches) {
      isMobile = true;
    }
    IFrameHelper.sendMessage('toggle-close-button', { isMobile });
  },
};
