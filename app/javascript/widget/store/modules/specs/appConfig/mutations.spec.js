import { mutations } from '../../appConfig';

describe('#mutations', () => {
  describe('#SET_REFERRER_HOST', () => {
    it('sets referrer host properly', () => {
      const state = { referrerHost: '' };
      mutations.SET_REFERRER_HOST(state, 'chat.cyber1s.com');
      expect(state.referrerHost).toEqual('chat.cyber1s.com');
    });
  });

  describe('#SET_WIDGET_COLOR', () => {
    it('sets widget color properly', () => {
      const state = { widgetColor: '' };
      mutations.SET_WIDGET_COLOR(state, '#00bcd4');
      expect(state.widgetColor).toEqual('#00bcd4');
    });
  });
});
