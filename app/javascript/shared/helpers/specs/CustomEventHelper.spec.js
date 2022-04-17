import { dispatchWindowEvent } from '../CustomEventHelper';

describe('dispatchWindowEvent', () => {
  it('dispatches correct event', () => {
    window.dispatchEvent = jest.fn();
    dispatchWindowEvent({ eventName: 'cyber1schat:ready' });
    expect(dispatchEvent).toHaveBeenCalled();
  });
});
