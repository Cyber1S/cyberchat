import { addClass, removeClass, toggleClass, c1chatOn } from './DOMHelpers';
import { IFrameHelper } from './IFrameHelper';
import { isExpandedView } from './settingsHelper';

export const bubbleImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAUVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////8IN+deAAAAGnRSTlMAAwgJEBk0TVheY2R5eo+ut8jb5OXs8fX2+cjRDTIAAADsSURBVHgBldZbkoMgFIThRgQv8SKKgGf/C51UnJqaRI30/9zfe+NQUQ3TvG7bOk9DVeCmshmj/CuOTYnrdBfkUOg0zlOtl9OWVuEk4+QyZ3DIevmSt/ioTvK1VH/s5bY3YdM9SBZ/mUUyWgx+U06ycgp7D8msxSvtc4HXL9BLdj2elSEfhBJAI0QNgJEBI1BEBsQClVBVGDgwYOLAhJkDM1YOrNg4sLFAsLJgZsHEgoEFFQt0JAFGFjQsKAMJ0LFAexKgZYFyJIDxJIBNJEDNAtSJBLCeBDCOBFAPzwFA94ED+zmhwDO9358r8ANtIsMXi7qVAwAAAABJRU5ErkJggg==';

export const body = document.getElementsByTagName('body')[0];
export const widgetHolder = document.createElement('div');

export const bubbleHolder = document.createElement('div');
export const chatBubble = document.createElement('button');
export const closeBubble = document.createElement('button');
export const notificationBubble = document.createElement('span');

export const setBubbleText = bubbleText => {
  if (isExpandedView(window.$cyber1schat.type)) {
    const textNode = document.getElementById('c1chat-widget--expanded__text');
    textNode.innerHTML = bubbleText;
  }
};

export const createBubbleIcon = ({ className, src, target }) => {
  let bubbleClassName = `${className} c1chat-elements--${window.$cyber1schat.position}`;
  const bubbleIcon = document.createElement('img');
  bubbleIcon.src = src;
  bubbleIcon.alt = 'bubble-icon';
  target.appendChild(bubbleIcon);

  if (isExpandedView(window.$cyber1schat.type)) {
    const textNode = document.createElement('div');
    textNode.id = 'c1chat-widget--expanded__text';
    textNode.innerHTML = '';
    target.appendChild(textNode);
    bubbleClassName += ' c1chat-widget--expanded';
  }

  target.className = bubbleClassName;
  return target;
};

export const createBubbleHolder = () => {
  addClass(bubbleHolder, 'c1chat--bubble-holder');
  body.appendChild(bubbleHolder);
};

export const createNotificationBubble = () => {
  addClass(notificationBubble, 'c1chat--notification');
  return notificationBubble;
};

export const onBubbleClick = (props = {}) => {
  const { toggleValue } = props;
  const { isOpen } = window.$cyber1schat;
  if (isOpen !== toggleValue) {
    const newIsOpen = toggleValue === undefined ? !isOpen : toggleValue;
    window.$cyber1schat.isOpen = newIsOpen;

    toggleClass(chatBubble, 'c1chat--hide');
    toggleClass(closeBubble, 'c1chat--hide');
    toggleClass(widgetHolder, 'c1chat--hide');
    IFrameHelper.events.onBubbleToggle(newIsOpen);

    if (!newIsOpen) {
      chatBubble.focus();
    }
  }
};

export const onClickChatBubble = () => {
  c1chatOn(bubbleHolder, 'click', onBubbleClick);
};

export const addUnreadClass = () => {
  const holderEl = document.querySelector('.c1chat-widget-holder');
  addClass(holderEl, 'has-unread-view');
};

export const removeUnreadClass = () => {
  const holderEl = document.querySelector('.c1chat-widget-holder');
  removeClass(holderEl, 'has-unread-view');
};
