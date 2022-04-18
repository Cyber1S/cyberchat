import { WOOH_PREFIX } from './constants';

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
      `cyberchat-widget:${JSON.stringify({ ...msg })}`,
      '*'
    );
  },
  isAValidEvent: e => {
    const isDataAString = typeof e.data === 'string';
    const isAValidWoohEvent =
      isDataAString && e.data.indexOf(WOOH_PREFIX) === 0;
    return isAValidWoohEvent;
  },
  getMessage: e => JSON.parse(e.data.replace(WOOH_PREFIX, '')),
};
export const RNHelper = {
  isRNWebView: () => window.ReactNativeWebView,
  sendMessage: msg => {
    window.ReactNativeWebView.postMessage(
      `cyberchat-widget:${JSON.stringify({ ...msg })}`
    );
  },
};
