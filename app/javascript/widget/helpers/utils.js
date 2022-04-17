import { C1CHAT_PREFIX } from './constants';

export const isEmptyObject = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const arrayToHashById = array =>
  array.reduce((map, obj) => {
    const newMap = map;
    newMap[obj.id] = obj;
    return newMap;
  }, {});

export const IFrameHelper = {
  isIFrame: () => window.self !== window.top,
  sendMessage: msg => {
    window.parent.postMessage(
      `cyber1schat-widget:${JSON.stringify({ ...msg })}`,
      '*'
    );
  },
  isAValidEvent: e => {
    const isDataAString = typeof e.data === 'string';
    const isAValidc1chatEvent =
      isDataAString && e.data.indexOf(C1CHAT_PREFIX) === 0;
    return isAValidc1chatEvent;
  },
  getMessage: e => JSON.parse(e.data.replace(C1CHAT_PREFIX, '')),
};
export const RNHelper = {
  isRNWebView: () => window.ReactNativeWebView,
  sendMessage: msg => {
    window.ReactNativeWebView.postMessage(
      `cyber1schat-widget:${JSON.stringify({ ...msg })}`
    );
  },
};
